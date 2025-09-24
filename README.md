# ripple-fast-store

A high-performance, minimal state management library for [Ripple](https://ripple.run/) apps, inspired by Zustand and designed for fine-grained reactivity. This package provides two main APIs: `createTrackedStore` and `NamedTrackedStore`, enabling both simple and named/global state management with automatic tracking and efficient updates.

## Features

- **Tracked state**: Only components that use a piece of state re-render when it changes.
- **Zustand-inspired API**: Familiar, ergonomic store creation.
- **Named stores**: Share state globally by name, with session persistence.
- **TypeScript support**: Full typings for safe, productive development.
- **Ripple-first**: Designed for the Ripple UI framework.

---

## Installation

You can install `ripple-fast-store` in your Ripple project using your preferred package manager:

```bash
pnpm add ripple-fast-store
# or
npm install ripple-fast-store
# or
yarn add ripple-fast-store
```

> **Note:** Requires Node.js v20+ and Ripple v0.2.63+.

---

## Usage

### 1. `createTrackedStore`: Local, Tracked State

Create a store and select slices of state that automatically track dependencies.

```typescript
import { createTrackedStore } from "ripple-fast-store";

const useCounter = createTrackedStore((set, get) => ({
	count: 0,
	inc: () => set({ count: get().count + 1 }),
	dec: () => set({ count: get().count - 1 }),
}));

// In your Ripple component:
<div>
	<button on:click={() => useCounter(s => s.inc())}>+</button>
	<span>{useCounter(s => s.count)}</span>
	<button on:click={() => useCounter(s => s.dec())}>-</button>
</div>
```

- The selector function (`s => s.count`) ensures only the relevant part of the state is tracked and re-renders when it changes.
- Methods like `inc` and `dec` update the state.

---

### 2. `NamedTrackedStore`: Global, Named State

Create or access a named, globally shared store. State persists in session storage and is accessible across components.

```typescript
import { NamedTrackedStore } from "ripple-fast-store";

const counterStore = NamedTrackedStore("counter", 0);

// In any component:
<button on:click={() => counterStore.set(counterStore.get() + 1)}>+</button>
<span>{counterStore.state}</span>
<button on:click={() => counterStore.set(counterStore.get() - 1)}>-</button>
```

- The `state` property is tracked and reactive.
- `set` and `get` allow direct manipulation and retrieval of the state.
- The store is globally accessible by its name.

---

## Advanced

- Both APIs leverage Ripple’s `track` and `effect` for fine-grained reactivity.
- You can use these stores in any Ripple component, and combine them for complex state needs.

---

## Development & Testing

- **Build:** `pnpm build` (or `npm run build`)
- **Test:** `pnpm test` (or `npm test`) — uses [Vitest](https://vitest.dev/)
- **Format:** `pnpm format` (or `npm run format`) — uses Prettier with Ripple plugin

---

## License

MIT

---

Let me know if you want code samples for more advanced patterns or integration with other libraries!