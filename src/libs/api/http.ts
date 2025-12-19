import axios, { isAxiosError, type AxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '../config';
import { token } from './auth/token';
import { refreshAccessToken } from './auth/refreshToken';

type RetriableConfig = AxiosRequestConfig & {
  _retried?: boolean;
};

let refreshPromise: Promise<string> | null = null; //Promise를 공유해서 리프레시가 끝날때까지 기다리게한다.

//401에러 시
function getFreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken().finally(() => {
      refreshPromise = null; //null로 초기화 해야 다시 함수가 실행한다.
    });
  }
  return refreshPromise;
}
//액세스토큰이랑 리프레쉬 토큰 변수에 담아서 사용
//공통 axios
//사용 예시 => http.get("/activities") = API_BASE_URL + "/activities"
export const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

http.interceptors.request.use((config) => {
  const isFormData = config.data instanceof FormData;
  config.headers = config.headers ?? {};
  //일반 데이터라면 json형식으로 보낸다.

  if (!isFormData) {
    config.headers['Content-Type'] = 'application/json';
  }
  const accessToken = token.getAccessToken();
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config; //인터셉터해서 수정한 요청을 다시 axios에게 돌려줘서 재요청
});

// 인수로 성공 & 에러 넣기
http.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (!isAxiosError(err)) {
      return Promise.reject(err);
    }

    const status = err.response?.status;
    const originalRequest = err.config as RetriableConfig | undefined;

    if (status !== 401 || !originalRequest) {
      return Promise.reject(err);
    }
    if (originalRequest._retried) {
      return Promise.reject(err);
    }
    originalRequest._retried = true;

    try {
      // refreshAccessToken 안에서 token.setTokens까지 하게 만들거나,
      // 여기서 직접 token.setTokens 해야 함
      const newAccessToken = await getFreshAccessToken();

      originalRequest.headers = originalRequest.headers ?? {};
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return http(originalRequest);
    } catch (e) {
      token.clearTokens();
      return Promise.reject(e);
    }
  }
);
