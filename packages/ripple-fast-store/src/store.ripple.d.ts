import { Tracked } from "ripple";

export declare function createTrackedStore<V>(): {
	set: (value: V) => void,
	get: () => V,
	state: Tracked<V>,
}