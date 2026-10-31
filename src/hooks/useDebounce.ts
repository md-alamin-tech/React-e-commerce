/**
 * useDebounce Hook
 * Debounces any fast-changing value (such as search input queries).
 *
 * @param value - target value to debounce
 * @param delay - delay in milliseconds (default: 300)
 */

import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
