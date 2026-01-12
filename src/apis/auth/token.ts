let accessToken: string | null = null;
let refreshToken: string | null = null;

const TOKEN_KEYS = {
  ACCESS: 'accessToken',
  REFRESH: 'refreshToken',
} as const;

// 초기화: localStorage에서 토큰 복원
const initializeTokens = () => {
  if (typeof window !== 'undefined') {
    accessToken = localStorage.getItem(TOKEN_KEYS.ACCESS);
    refreshToken = localStorage.getItem(TOKEN_KEYS.REFRESH);
  }
};

initializeTokens();

export const token = {
  getAccessToken: () => accessToken,
  getRefreshToken: () => refreshToken,

  setTokens: (access: string, refresh: string) => {
    accessToken = access;
    refreshToken = refresh;

    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEYS.ACCESS, access);
      localStorage.setItem(TOKEN_KEYS.REFRESH, refresh);
    }
  },

  clearTokens: () => {
    accessToken = null;
    refreshToken = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEYS.ACCESS);
      localStorage.removeItem(TOKEN_KEYS.REFRESH);
    }
  },
};
