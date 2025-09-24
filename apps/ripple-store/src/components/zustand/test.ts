import { createTrackedStore } from "ripple-fast-store";

interface CounterStateType {
    count: number,
    increment: () => void
}

const trackedCounterStore = createTrackedStore<CounterStateType>((set, get) => ({
	count: 0,
  	increment: () => set({ count: get().count + 1 }),
}));

const count = trackedCounterStore(state => state.count)
const increment = trackedCounterStore(state => state.increment)
