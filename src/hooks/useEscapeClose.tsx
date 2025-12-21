import { useEffect } from 'react';

interface UseEscapeCloseProps {
  isOpen: boolean;
  onClose: () => void;
  enabled?: boolean;
}

export default function useEscapeClose({ isOpen, onClose, enabled = true }: UseEscapeCloseProps) {
  useEffect(() => {
    if (!isOpen || !enabled) {
      return;
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose, enabled]);
}
