import { useEffect, useRef } from 'react';

type UseDraftParams<T> = {
  key: string;
  values: T;
  applyDraft: (draft: T) => void;
  delayMs?: number;
};

export function useDraftParams<T>({ key, values, applyDraft, delayMs = 400 }: UseDraftParams<T>) {
  const restoredRef = useRef(false);
  useEffect(() => {
    if (restoredRef.current) {
      return;
    }

    const item = localStorage.getItem(key);

    if (item) {
      try {
        const draft = JSON.parse(item) as T;
        applyDraft(draft);
      } catch {
        localStorage.removeItem(key);
      }
    }
    restoredRef.current = true;
  }, [key, applyDraft]);

  useEffect(() => {
    const t = window.setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify(values));
      } catch {
        // values에 File 같은 게 섞이면 stringify가 실패할 수 있음
      }
    }, delayMs);

    return () => window.clearTimeout(t);
  }, [key, values, delayMs]);

  const clearDraft = () => localStorage.removeItem(key);

  return { clearDraft };
}
