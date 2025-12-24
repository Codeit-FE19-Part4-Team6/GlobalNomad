import { createContext, useContext } from 'react';

export type CardVariant = 'grid' | 'list' | 'reservation';

interface CardContextProps {
  variant: CardVariant;
}

export const CardContext = createContext<CardContextProps | undefined>(undefined);

export const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error('Card 컴포넌트 안에서 사용해주세요.');
  }
  return context;
};
