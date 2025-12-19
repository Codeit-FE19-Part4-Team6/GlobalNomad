let accessToken: string | null = null;
let refreshToken: string | null = null;

export const token = {
  getAccessToken: () => accessToken,
  getRefreshToken: () => refreshToken,

  setTokens: (access: string, refresh: string) => {
    accessToken = access;
    refreshToken = refresh;
  },

  clearTokens: () => {
    accessToken = null;
    refreshToken = null;
  },
};
