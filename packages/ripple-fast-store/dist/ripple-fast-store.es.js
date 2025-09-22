import * as $ from 'ripple/internal/client';
import { createContext, track, effect } from 'ripple';

const StoreContext = createContext(new Map());

function createTrackedStore(storeName, init) {
	var __block = $.scope();

	console.log('create store', storeName, init);

	if (!storeName) {
		throw new Error('Store name not found.');
	}

	const context = StoreContext.get();
	let existingState = init;

	if (context.has(storeName)) {
		existingState = context.get(storeName);
	}

	const state = track(
		() => {
			context.set(storeName, existingState);

			return existingState;
		},
		__block
	);

	effect(() => {
		context.set(storeName, $.get(state));
	});

	function set(value) {
		$.set(state, value, __block);
	}

	function get() {
		return $.get(state);
	}

	return { set, get, state };
}

function TrackedStore(storeName, init) {
	var __block = $.scope();

	console.log('tracked store', storeName, init);

	if (!storeName) {
		throw new Error('Store name not found.');
	}

	const context = StoreContext.get();
	let existingState = init;
	let state;

	if (context.has(storeName)) {
		state = context.get(storeName);
	}

	if (!state) {
		state = track(
			() => {
				return existingState;
			},
			__block
		);

		context.set(storeName, state);
	}

	effect(() => {
		sessionStorage.setItem('storeName', $.get(state));
		context.set(storeName, $.get(state));
		StoreContext.set(context);
	});

	function set(value) {
		$.set(state, value, __block);
	}

	function get() {
		return $.get(state);
	}

	return { set, get, state };
}

export { TrackedStore, createTrackedStore };
