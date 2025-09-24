import * as $ from 'ripple/internal/client';
import { track, effect, createContext } from 'ripple';

const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const api = { setState, getState, getInitialState, subscribe };
  const initialState = state = createState(setState, getState, api);
  return api;
};
const createStore = ((createState) => createState ? createStoreImpl(createState) : createStoreImpl);

function createTrackedStore(initializer) {
	$.scope();
	const store = createStore((set, get) => initializer(set, get));

	return (fn) => tracedState(fn, store);
}

function tracedState(fn, store) {
	var __block = $.scope();
	const currentState = store.getState();
	const returnSlice = fn(currentState);

	if (typeof returnSlice == 'function') {
		return returnSlice;
	}

	const trackedSlice = track(
		() => {
			return returnSlice;
		},
		__block
	);

	effect(() => {
		return store.subscribe((newState) => {
			console.log('State changed:', newState);

			const newSlice = fn(newState);

			console.log(newSlice);
			$.set(trackedSlice, newSlice, __block);
		});
	});

	return trackedSlice;
}

const StoreContext = createContext(new Map());

function NamedTrackedStore(storeName, init) {
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

export { NamedTrackedStore, createTrackedStore };
