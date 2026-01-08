// //임시저장을 위한 훅
// import { useEffect, useRef } from 'react';

// type UseDraftParams<T> = {
//   key: string;
//   values: T;
//   applyDraft: (draft: T) => void;
//   delayMs?: number;
//   maxBytes?: number;
// };

// export function useDraftParams<T>({
//   key,
//   values,
//   applyDraft,
//   delayMs = 400,
//   maxBytes = 200 * 1024,
// }: UseDraftParams<T>) {
//   const restoredRef = useRef(false);
//   useEffect(() => {
//     //이미 복구되었으면 리턴 => 한번만 복구
//     if (restoredRef.current) {
//       return;
//     }
//     //임시저장된 밸류들을 하나의 key로 객체화 해서 저장한걸 item으로 꺼낸다.
//     const item = localStorage.getItem(key);

//     if (item) {
//       try {
//         //문자열로 저장된 item을 객체화 해서 적용함
//         const draft = JSON.parse(item) as T;
//         applyDraft(draft);
//       } catch {
//         localStorage.removeItem(key);
//       }
//     }
//     //복구 완료
//     restoredRef.current = true;
//   }, [key, applyDraft]);

//   useEffect(() => {
//     const t = window.setTimeout(() => {
//       try {
//         //문자열만 저장
//         const json = JSON.stringify(values);
//         if (json.length > maxBytes) {
//           localStorage.removeItem(key);
//           return;
//         }
//         localStorage.setItem(key, json);
//       } catch {
//         localStorage.removeItem(key);
//       }
//     }, delayMs);

//     return () => window.clearTimeout(t);
//   }, [key, values, delayMs, maxBytes]);

//   const clearDraft = () => localStorage.removeItem(key);

//   return { clearDraft };
// }

// 임시저장을 위한 훅
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

  // ✅ 디바운스 타이머 id를 잡아두는 ref
  const timerRef = useRef<number | null>(null);

  // ✅ clearDraft 직후 “다시 저장되는 것”까지 막고 싶으면 사용
  // (등록 성공 후 바로 navigate 하면 사실상 필요 없지만, 안전하게 넣어둠)
  const pausedRef = useRef(false);

  // 1) 최초 1회: draft 복구
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

  // 2) values 변경 시: 디바운스로 저장 예약
  useEffect(() => {
    // ✅ 이전에 예약된 저장이 있으면 취소
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // ✅ clearDraft 이후에는 저장 예약 자체를 하지 않음
    if (pausedRef.current) {
      return;
    }

    timerRef.current = window.setTimeout(() => {
      try {
        const json = JSON.stringify(values);

        if (json.length > maxBytes) {
          localStorage.removeItem(key);
          return;
        }

        localStorage.setItem(key, json);
      } catch {
        localStorage.removeItem(key);
      }
    }, delayMs);

    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [key, values, delayMs, maxBytes]);

  // 3) draft 삭제: ✅ 예약된 디바운스 저장까지 같이 취소 + 로컬 삭제
  const clearDraft = () => {
    pausedRef.current = true; // ✅ 이후 저장 막기(등록 성공 후 바로 이동이면 안정성만↑)

    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current); // ✅ 예약 저장 취소
      timerRef.current = null;
    }

    localStorage.removeItem(key); // ✅ draft 삭제
  };

  return { clearDraft };
}
