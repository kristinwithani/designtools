import { useCallback, useRef, useState } from "react";

type History<T> = { past: T[]; present: T; future: T[] };

/** Consecutive edits to the same control within this window collapse into one undo step. */
const MERGE_WINDOW_MS = 700;
const LIMIT = 100;

/**
 * Undoable state. Discrete edits push a step; passing a `coalesceKey` lets a run of
 * edits to one control — dragging a colour picker, say — count as a single step.
 */
export function useHistory<T>(initial: T) {
  const [history, setHistory] = useState<History<T>>({ past: [], present: initial, future: [] });
  const lastEdit = useRef<{ key: string | null; at: number }>({ key: null, at: 0 });

  const commit = useCallback((next: T | ((prev: T) => T), coalesceKey?: string) => {
    const now = Date.now();
    const merge =
      coalesceKey !== undefined &&
      lastEdit.current.key === coalesceKey &&
      now - lastEdit.current.at < MERGE_WINDOW_MS;
    lastEdit.current = { key: coalesceKey ?? null, at: now };

    setHistory((h) => {
      const value = typeof next === "function" ? (next as (prev: T) => T)(h.present) : next;
      if (Object.is(value, h.present)) return h;
      return {
        past: merge ? h.past : [...h.past, h.present].slice(-LIMIT),
        present: value,
        future: [],
      };
    });
  }, []);

  const undo = useCallback(() => {
    lastEdit.current = { key: null, at: 0 };
    setHistory((h) => {
      if (h.past.length === 0) return h;
      return {
        past: h.past.slice(0, -1),
        present: h.past[h.past.length - 1],
        future: [h.present, ...h.future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    lastEdit.current = { key: null, at: 0 };
    setHistory((h) => {
      if (h.future.length === 0) return h;
      return {
        past: [...h.past, h.present],
        present: h.future[0],
        future: h.future.slice(1),
      };
    });
  }, []);

  return {
    state: history.present,
    commit,
    undo,
    redo,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
  };
}
