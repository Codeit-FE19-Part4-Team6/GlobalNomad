import { createContext, useContext } from 'react';

export type DropdownContextType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const DropdownContext = createContext<DropdownContextType | null>(null);

export const useDropdown = () => {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error('useDropdown은 DropdownContext.Provider 안에서 사용해야 합니다.');
  }

  return context;
};

export default DropdownContext;
