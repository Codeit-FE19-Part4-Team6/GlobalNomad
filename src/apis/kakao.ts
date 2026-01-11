import { KAKAO_AUTH_URL, KAKAO_REST_API_KEY, KAKAO_REDIRECT_URI } from '@/libs/config';
import axios from 'axios';

export const kakao = axios.create({
  baseURL: KAKAO_AUTH_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  },
});

export const kakaoApi = {
  // 카카오 로그인 URL 생성
  // 인가코드 요청
  // kakaoApi.ts
  getKakaoAuthUrl(state: string) {
    const params = new URLSearchParams({
      client_id: KAKAO_REST_API_KEY,
      redirect_uri: KAKAO_REDIRECT_URI,
      response_type: 'code',
      state: state,
    });

    return `${KAKAO_AUTH_URL}/oauth/authorize?${params.toString()}`;
  },
};
