import { Tracked } from "ripple";

export declare function createTrackedStore<T>(
  initializer: (set: (state: Partial<T>) => void, get: () => T) => T
): <U>(selector: (state: T) => U) => U extends Function ? U : Tracked<U>


