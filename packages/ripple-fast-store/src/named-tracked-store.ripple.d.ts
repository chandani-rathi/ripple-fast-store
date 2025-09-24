import { Tracked } from "ripple";

export declare function NamedTrackedStore<V>(storeName: string, initState: V): {
    set: (value: V) => void,
    get: () => V,
    state: Tracked<V>,
}