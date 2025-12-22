import { useEffect } from 'react';

interface UseBodyScrollLockProps {
  isLocked: boolean;
}

export default function useBodyScrollLock({ isLocked }: UseBodyScrollLockProps) {
  useEffect(() => {
    if (!isLocked) {
      return;
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isLocked]);
}
