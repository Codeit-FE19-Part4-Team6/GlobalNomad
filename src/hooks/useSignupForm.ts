// src/hooks/useSignupForm.ts

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import {
  isValidEmail,
  isValidNickname,
  checkEmailDuplicate,
  checkNicknameDuplicate,
  getErrorMessage,
} from '@/utils/validation.utils';

export interface SignupFormInputs {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
}

export const useSignupForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<SignupFormInputs>({
    mode: 'onChange', // 실시간 검증으로 변경
  });

  const watchEmail = watch('email');
  const watchNickname = watch('nickname');
  const watchPassword = watch('password');
  const watchPasswordConfirm = watch('passwordConfirm');

  // 폼 유효성 검사
  useEffect(() => {
    const allFieldsFilled =
      watchEmail?.trim() !== '' &&
      watchNickname?.trim() !== '' &&
      watchPassword?.trim() !== '' &&
      watchPasswordConfirm?.trim() !== '';

    const noErrors = Object.keys(errors).length === 0;

    const passwordsMatch = watchPassword === watchPasswordConfirm;

    setIsFormValid(
      allFieldsFilled && noErrors && passwordsMatch && emailChecked && nicknameChecked
    );
  }, [
    watchEmail,
    watchNickname,
    watchPassword,
    watchPasswordConfirm,
    errors,
    isValid,
    emailChecked,
    nicknameChecked,
  ]);

  // 이메일 중복 체크
  const handleEmailCheck = async (email: string) => {
    if (!isValidEmail(email)) {
      setError('email', { message: '올바른 이메일 형식이 아닙니다' });
      return false;
    }
    try {
      const isDuplicate = await checkEmailDuplicate(email);
      if (isDuplicate) {
        setError('email', { message: '이미 사용 중인 이메일입니다' });
        setEmailChecked(false);
        return false;
      }
      clearErrors('email');
      setEmailChecked(true);
      return true;
    } catch (error) {
      setError('email', { message: '이메일 중복 확인에 실패했습니다' });
      return false;
    }
  };

  // 닉네임 중복 체크
  const handleNicknameCheck = async (nickname: string) => {
    if (!isValidNickname(nickname)) {
      setError('nickname', { message: '2-10자의 한글, 영문, 숫자만 가능합니다' });
      return false;
    }

    try {
      const isDuplicate = await checkNicknameDuplicate(nickname);
      if (isDuplicate) {
        setError('nickname', { message: '이미 사용 중인 닉네임입니다' });
        setNicknameChecked(false);
        return false;
      }
      clearErrors('nickname');
      setNicknameChecked(true);
      return true;
    } catch (error) {
      setError('nickname', { message: '닉네임 중복 확인에 실패했습니다' });
      return false;
    }
  };

  // 폼 제출
  const onSubmit = async (data: SignupFormInputs) => {
    setIsSubmitting(true);
    try {
      // 중복 체크 확인
      if (!emailChecked) {
        const isEmailValid = await handleEmailCheck(data.email);
        if (!isEmailValid) {
          setIsSubmitting(false);
          return;
        }
      }

      if (!nicknameChecked) {
        const isNicknameValid = await handleNicknameCheck(data.nickname);
        if (!isNicknameValid) {
          setIsSubmitting(false);
          return;
        }
      }

      // TODO: 실제 회원가입 API 호출
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          nickname: data.nickname,
          password: data.password,
        }),
      });

      if (!response.ok) {
        throw new Error('회원가입에 실패했습니다');
      }

      const result = await response.json();
      console.log('회원가입 성공:', result);

      // 회원가입 성공 후 처리 (예: 로그인 페이지로 이동)
      window.location.href = '/login';
    } catch (error) {
      console.error('회원가입 실패:', error);
      setError('email', { message: '회원가입에 실패했습니다. 다시 시도해주세요.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 폼 등록 설정
  const registerOptions = {
    email: register('email', {
      required: '이메일을 입력해주세요',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: '올바른 이메일 형식이 아닙니다',
      },
      onChange: () => setEmailChecked(false), // 이메일 변경 시 체크 초기화
    }),
    nickname: register('nickname', {
      required: '닉네임을 입력해주세요',
      minLength: { value: 2, message: '닉네임은 2자 이상이어야 합니다' },
      maxLength: { value: 10, message: '닉네임은 10자 이하여야 합니다' },
      pattern: {
        value: /^[가-힣a-zA-Z0-9]{2,10}$/,
        message: '한글, 영문, 숫자만 사용 가능합니다',
      },
      onChange: () => setNicknameChecked(false), // 닉네임 변경 시 체크 초기화
    }),
    password: register('password', {
      required: '비밀번호를 입력해주세요',
      minLength: { value: 8, message: '8자 이상 입력하세요' },
      pattern: {
        value: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/,
        message: '영문과 숫자를 포함해야 합니다',
      },
    }),
    passwordConfirm: register('passwordConfirm', {
      required: '비밀번호 확인을 입력해주세요',
      validate: (value) => value === watchPassword || '비밀번호가 일치하지 않습니다',
    }),
  };

  return {
    registerOptions,
    errors,
    isSubmitting,
    isFormValid,
    emailChecked,
    nicknameChecked,
    handleSubmit: handleSubmit(onSubmit),
    handleEmailCheck,
    handleNicknameCheck,
    getErrorMessage,
    watchEmail,
    watchNickname,
  };
};
