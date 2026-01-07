//임시저장을 위한 훅
import { useEffect, useRef } from 'react';

type UseDraftParams<T> = {
  key: string;
  values: T;
  applyDraft: (draft: T) => void;
  delayMs?: number;
  maxBytes?: number;
};

export function useDraftParams<T>({
  key,
  values,
  applyDraft,
  delayMs = 400,
  maxBytes = 200 * 1024,
}: UseDraftParams<T>) {
  const restoredRef = useRef(false);
  useEffect(() => {
    //이미 복구되었으면 리턴 => 한번만 복구
    if (restoredRef.current) {
      return;
    }
    //임시저장된 밸류들을 하나의 key로 객체화 해서 저장한걸 item으로 꺼낸다.
    const item = localStorage.getItem(key);

    if (item) {
      try {
        //문자열로 저장된 item을 객체화 해서 적용함
        const draft = JSON.parse(item) as T;
        applyDraft(draft);
      } catch {
        localStorage.removeItem(key);
      }
    }
    //복구 완료
    restoredRef.current = true;
  }, [key, applyDraft]);

  useEffect(() => {
    const t = window.setTimeout(() => {
      try {
        //문자열만 저장
        const json = JSON.stringify(values);
        console.log('draft bytes:', json.length);
        if (json.length > maxBytes) {
          localStorage.removeItem(key);
          return;
        }
        localStorage.setItem(key, json);
      } catch {
        localStorage.removeItem(key);
      }
    }, delayMs);

    return () => window.clearTimeout(t);
  }, [key, values, delayMs, maxBytes]);

  const clearDraft = () => localStorage.removeItem(key);

  return { clearDraft };
}
