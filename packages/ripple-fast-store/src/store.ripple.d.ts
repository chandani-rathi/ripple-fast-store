import { Tracked } from "ripple";

export declare function createTrackedStore<V>(
    initialState: V
): (slice: Function) => Tracked<V>