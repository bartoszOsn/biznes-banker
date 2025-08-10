import { useRef } from 'react';

const USE_SINGLE_UNINITIALIZED = Symbol('USE_SINGLE_UNINITIALIZED');

// Prefer to use `useMemo` or `useEffect` for memoization, but this is useful for cases where you want to run a factory function only once.
// In some cases, you might want to use this to initialize a value that should not change after the first render.
// Example: Firebase connectDatabaseEmulator throws an error if called multiple times, so we use this to ensure it is only called once.
export function useOnce<T>(factory: () => T): T {
  const ref = useRef<T | typeof USE_SINGLE_UNINITIALIZED>(USE_SINGLE_UNINITIALIZED);

  if (ref.current === USE_SINGLE_UNINITIALIZED) {
	ref.current = factory();
  }

  return ref.current;
}

export const useOnceEffect = useOnce<void>;