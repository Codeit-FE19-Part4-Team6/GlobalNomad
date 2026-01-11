import { KAKAO_AUTH_URL, KAKAO_REST_API_KEY, KAKAO_REDIRECT_URI } from '@/libs/config';
import axios from 'axios';
// 참고용 - 카카오 사용자 정보 타입
// interface KakaoUserInfo {
//   id: number;
//   kakao_account: {
//     profile?: {
//       nickname?: string;
//       profile_image_url?: string;
//       thumbnail_image_url?: string;
//     };
//     email?: string;
//   };
// }
export const kakao = axios.create({
  baseURL: KAKAO_AUTH_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  },
});
// 카카오 API 서버용 (사용자 정보 등)
// const kakaoUserApi = axios.create({
//   baseURL: 'https://kapi.kakao.com',
//   timeout: 5000,
// });

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

  // 인가 코드로 토큰 받기
  //   async getKakaoToken(code: string) {
  //     const params = new URLSearchParams({
  //       grant_type: 'authorization_code',
  //       client_id: KAKAO_REST_API_KEY,
  //       redirect_uri: KAKAO_REDIRECT_URI,
  //       code: code,
  //     });

  //     const response = await kakao.post('/oauth/token', params);
  //     return response.data;
  //   },

  // 카카오 사용자 정보 가져오기
  //   async getKakaoUserInfo(accessToken: string) {
  //     const response = await kakaoUserApi.get('/v2/user/me', {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });
  //     return response.data;
  //   },

  //   // 토큰 갱신
  //   async refreshKakaoToken(refreshToken: string) {
  //     const params = new URLSearchParams({
  //       grant_type: 'refresh_token',
  //       client_id: KAKAO_REST_API_KEY,
  //       refresh_token: refreshToken,
  //     });

  //     const response = await kakao.post('/oauth/token', params);
  //     return response.data;
  //   },

  //   async unlinkKakaoUser(accessToken: string) {
  //     const response = await kakaoUserApi.post(
  //       '/v1/user/unlink',
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );
  //     return response.data;
  //   },
};
