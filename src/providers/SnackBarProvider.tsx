// src/providers/SnackBarProvider.tsx
import { createContext, useCallback, useContext, useRef, useState } from 'react';
import SnackBar from '@/components/common/SnackBar';
import type { Snack, SnackBarType, SnackBarOptions } from '@/types/snackbar.types';

interface SnackBarContextValue {
  showSnack: (message: string, type?: SnackBarType, options?: SnackBarOptions) => void;
}

const SnackBarContext = createContext<SnackBarContextValue | null>(null);

export function SnackBarProvider({ children }: { children: React.ReactNode }) {
  const [snacks, setSnacks] = useState<Snack[]>([]);
  const idCounterRef = useRef(0);

  const showSnack = useCallback(
    (
      message: string,
      type: Snack['type'] = 'success',
      options?: { duration?: number; onClose?: () => void }
    ) => {
      const id = ++idCounterRef.current;
      setSnacks((prev) => [...prev, { id, message, type, ...options }]);
    },
    []
  );

  const removeSnack = useCallback((id: number) => {
    setSnacks((prev) => prev.filter((snack) => snack.id !== id));
  }, []);

  return (
    <SnackBarContext.Provider value={{ showSnack }}>
      {children}
      {snacks.map((snack, index) => (
        <SnackBar
          key={snack.id}
          isOpen
          message={snack.message}
          type={snack.type}
          duration={snack.duration}
          stackIndex={index}
          onClose={() => {
            snack.onClose?.();
            removeSnack(snack.id);
          }}
        />
      ))}
    </SnackBarContext.Provider>
  );
}

export const useSnackBar = () => {
  const ctx = useContext(SnackBarContext);
  if (!ctx) {
    throw new Error('useSnackBar must be used within SnackBarProvider');
  }
  return ctx;
};
