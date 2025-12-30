// src/hooks/useSignupForm.ts

import { useForm } from 'react-hook-form';
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [lastCheckedEmail, setLastCheckedEmail] = useState('');
  const [lastCheckedNickname, setLastCheckedNickname] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<SignupFormInputs>({
    mode: 'onChange',
  });

  const watchEmail = watch('email');
  const watchNickname = watch('nickname');
  const watchPassword = watch('password');
  const watchPasswordConfirm = watch('passwordConfirm');
  const navigate = useNavigate();

  const emailChecked = lastCheckedEmail === watchEmail && !!watchEmail;
  const nicknameChecked = lastCheckedNickname === watchNickname && !!watchNickname;

  // 폼 유효성 검사
  const isFormValid = useMemo(() => {
    const allFieldsFilled =
      !!watchEmail?.trim() &&
      !!watchNickname?.trim() &&
      !!watchPassword?.trim() &&
      !!watchPasswordConfirm?.trim();

    return allFieldsFilled && isValid && emailChecked && nicknameChecked;
  }, [
    watchEmail,
    watchNickname,
    watchPassword,
    watchPasswordConfirm,
    isValid,
    emailChecked,
    nicknameChecked,
  ]);

  const handleEmailCheck = async (email: string) => {
    if (!isValidEmail(email)) {
      setError('email', { message: '올바른 이메일 형식이 아닙니다' });
      return false;
    }
    try {
      const isDuplicate = await checkEmailDuplicate(email);
      if (isDuplicate) {
        setError('email', { message: '이미 사용 중인 이메일입니다' });
        return false;
      }
      clearErrors('email');
      setLastCheckedEmail(email);
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : '이메일 중복 확인에 실패했습니다';
      setError('email', { message });
      return false;
    }
  };

  const handleNicknameCheck = async (nickname: string) => {
    if (!isValidNickname(nickname)) {
      setError('nickname', { message: '2-10자의 한글, 영문, 숫자만 가능합니다' });
      return false;
    }

    try {
      const isDuplicate = await checkNicknameDuplicate(nickname);
      if (isDuplicate) {
        setError('nickname', { message: '이미 사용 중인 닉네임입니다' });
        return false;
      }
      clearErrors('nickname');
      setLastCheckedNickname(nickname);
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : '닉네임 중복 확인에 실패했습니다';
      setError('nickname', { message });
      return false;
    }
  };

  const onSubmit = async (data: SignupFormInputs) => {
    // isFormValid가 true일 때만 호출되므로 중복 체크 재확인 불필요
    setIsSubmitting(true);
    try {
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
        const errorData = await response.json();
        throw new Error(errorData.message || '회원가입에 실패했습니다');
      }

      const result = await response.json();
      console.log('회원가입 성공:', result);
      navigate('/login');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : '회원가입에 실패했습니다. 다시 시도해주세요.';
      setError('root', { message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const registerOptions = {
    email: register('email', {
      required: '이메일을 입력해주세요',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: '올바른 이메일 형식이 아닙니다',
      },
    }),
    nickname: register('nickname', {
      required: '닉네임을 입력해주세요',
      pattern: {
        value: /^[가-힣a-zA-Z0-9]{2,10}$/,
        message: '2~10자의 한글, 영문, 숫자만 사용 가능합니다',
      },
    }),
    password: register('password', {
      required: '비밀번호를 입력해주세요',
      pattern: {
        value: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/,
        message: '8자 이상, 영문과 숫자를 포함해야 합니다',
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
