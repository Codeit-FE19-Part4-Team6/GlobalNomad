import { useEffect } from 'react';

type UseOutsideClickProps = {
  ref: React.RefObject<HTMLElement | null>;
  onOutsideClick: () => void;
  enabled?: boolean;
};

export default function useOutsideClick({
  ref,
  onOutsideClick,
  enabled = true,
}: UseOutsideClickProps) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleClick = (e: MouseEvent) => {
      if (!ref.current) {
        return;
      }
      if (!ref.current.contains(e.target as Node)) {
        onOutsideClick();
      }
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, onOutsideClick, enabled]);
}
