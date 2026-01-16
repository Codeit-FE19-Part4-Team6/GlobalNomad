// src/utils/generateKakaoNickname.ts
import { ADJECTIVES, NOUNS } from '@/constants/koreanWords';

export const generateKakaoNickname = () => {
  const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];

  // 50% 확률로 숫자 붙이기 (1~99)
  const shouldAddNumber = Math.random() < 0.5;
  const number = Math.floor(Math.random() * 99) + 1;

  return shouldAddNumber ? `${adjective}${noun}${number}` : `${adjective}${noun}`;
};
