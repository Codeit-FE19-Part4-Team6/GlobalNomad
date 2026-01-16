// src/providers/SnackBarProvider.tsx
import { createContext, useCallback, useContext, useRef, useState } from 'react';
import SnackBar from '@/components/common/SnackBar';
import type { Snack, SnackBarType, SnackBarOptions } from '@/types/snackbar.types';

interface SnackBarContextValue {
  showSnack: (message: string, type?: SnackBarType, options?: SnackBarOptions) => void;
}

const SnackBarContext = createContext<SnackBarContextValue | null>(null);

export function SnackBarProvider({ children }: { children: React.ReactNode }) {
  const [snack, setSnack] = useState<Snack | null>(null);
  const idCounterRef = useRef(0);

  const showSnack = useCallback(
    (
      message: string,
      type: Snack['type'] = 'success',
      options?: { duration?: number; onClose?: () => void }
    ) => {
      const id = ++idCounterRef.current;
      setSnack({ id, message, type, ...options });
    },
    []
  );

  const removeSnack = useCallback(() => {
    setSnack(null);
  }, []);

  return (
    <SnackBarContext.Provider value={{ showSnack }}>
      {children}
      {snack && (
        <SnackBar
          key={snack.id}
          isOpen
          message={snack.message}
          type={snack.type}
          duration={snack.duration}
          stackIndex={0}
          onClose={() => {
            snack.onClose?.();
            removeSnack();
          }}
        />
      )}
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
