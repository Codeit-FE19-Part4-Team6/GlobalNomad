// src/pages/KakaoCallbackPage.tsx
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { token } from '@/apis/auth/token';
import { http } from '@/apis/http';
import { KAKAO_REDIRECT_URI } from '@/libs/config';
import { isAxiosError } from 'axios';
import { useSnackBar } from '@/providers/SnackBarProvider';

const KakaoCallbackPage = () => {
  const navigate = useNavigate();
  const hasProcessed = useRef(false);
  const { showSnack } = useSnackBar();

  useEffect(() => {
    if (hasProcessed.current) {
      return;
    }
    hasProcessed.current = true;

    const handleKakaoCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (!code) {
        showSnack('카카오 인증에 실패했습니다.', 'error', {
          onClose: () => navigate('/login'),
        });
        return;
      }

      // 회원가입 모드인지 확인
      const isKakaoSignUpMode = sessionStorage.getItem('isKakaoSignUpMode') === 'true';

      try {
        console.log('1. 인가 코드:', code);
        console.log('2. 모드:', isKakaoSignUpMode ? '회원가입' : '로그인');

        // 카카오 토큰 받기
        //// ✅ 1. 인가 코드 사용 --> 토큰 받기 ///
        // const kakaoTokenData = await kakaoApi.getKakaoToken(code);
        // console.log('3. 카카오 토큰:', kakaoTokenData);

        // // 카카오 사용자 정보 가져오기
        // const kakaoUserInfo = await kakaoApi.getKakaoUserInfo(kakaoTokenData.access_token);
        // console.log('4. 카카오 사용자 정보:', kakaoUserInfo);

        const requestData = {
          token: code,
          redirectUri: KAKAO_REDIRECT_URI,
        };

        if (isKakaoSignUpMode) {
          // 회원가입 모드
          console.log('5. 회원가입 시도');

          // 카카오 닉네임 사용
          //   const kakaoNickname = kakaoUserInfo.kakao_account?.profile?.nickname || 'KakaoUser';
          const kakaoNickname = 'KakaoUser';

          //// ✅ 2-1. 인가 코드 사용 --> 회원가입 리퀘스트 바디로 ///
          const signUpResponse = await http.post('/oauth/sign-up/kakao', {
            nickname: kakaoNickname,
            token: code,
            redirectUri: KAKAO_REDIRECT_URI,
          });

          console.log('6. 회원가입 성공:', signUpResponse.data);

          // 세션 스토리지 정리
          sessionStorage.removeItem('isKakaoSignUpMode');

          token.setTokens(signUpResponse.data.accessToken, signUpResponse.data.refreshToken);
          showSnack(`${kakaoNickname}님, 환영합니다!`, 'success', {
            onClose: () => navigate('/'),
          });
        } else {
          // 로그인 모드
          console.log('5. 로그인 시도');
          //// ✅ 2-2. 인가 코드 사용 --> 로그인 리퀘스트 바디로 ///
          const response = await http.post('/oauth/sign-in/kakao', requestData);
          console.log('6. 로그인 성공:', response.data);

          token.setTokens(response.data.accessToken, response.data.refreshToken);
          showSnack('로그인에 성공했습니다.', 'success', { onClose: () => navigate('/') });
        }
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 403 && !isKakaoSignUpMode) {
          // 로그인 모드에서 가입되지 않은 사용자
          console.log('7. 가입되지 않은 사용자 - 회원가입 페이지로 이동');

          showSnack('가입되지 않은 사용자입니다. 회원가입을 진행해주세요.', 'error', {
            onClose: () => navigate('/signup'),
          });
        } else {
          console.error('❌ 카카오 처리 실패:', error);

          // 에러 시 세션 정리
          sessionStorage.removeItem('isKakaoSignUpMode');

          const errorMessage =
            isAxiosError(error) && error.response?.data?.message
              ? error.response.data.message
              : '카카오 처리에 실패했습니다.';

          showSnack(errorMessage, 'error', { onClose: () => navigate('/login') });
        }
      }
    };

    handleKakaoCallback();
  }, [navigate, showSnack]);

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='text-center'>
        <div className='mb-4 text-xl'>처리 중...</div>
        <div className='text-gray-500'>잠시만 기다려주세요.</div>
      </div>
    </div>
  );
};

export default KakaoCallbackPage;
