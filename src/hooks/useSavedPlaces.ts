'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'dj_saved_places';

function readFromStorage(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

function writeToStorage(ids: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  } catch {
    // Storage may be unavailable in private mode
  }
}

export function useSavedPlaces() {
  // Start empty — hydrate from localStorage in useEffect to avoid SSR mismatch
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSavedIds(readFromStorage());
    setHydrated(true);
  }, []);

  const savePlace = useCallback((id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      writeToStorage(next);
      return next;
    });
  }, []);

  const unsavePlace = useCallback((id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      writeToStorage(next);
      return next;
    });
  }, []);

  const toggleSaved = useCallback((id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      writeToStorage(next);
      return next;
    });
  }, []);

  const isSaved = useCallback(
    (id: string) => savedIds.has(id),
    [savedIds]
  );

  return { savedIds, hydrated, isSaved, savePlace, unsavePlace, toggleSaved };
}
