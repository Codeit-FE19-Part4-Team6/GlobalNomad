import { refreshHttp } from '../refreshHttp';
import { token } from '../auth/token';
//서버에서 보내주는 타입
type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
};

export async function refreshAccessToken() {
  const refreshToken = token.getRefreshToken();
  if (!refreshToken) {
    throw new Error('리프레시 토큰이 없습니다.');
  }

  const res = await refreshHttp.post<RefreshResponse>(
    '/auth/tokens',
    null, //바디 비어있음 헤더로만 보내기
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );

  token.setTokens(res.data.accessToken, res.data.refreshToken);
  return res.data.accessToken;
}
