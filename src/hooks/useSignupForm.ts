// src/hooks/useSignupForm.ts

import { useForm } from 'react-hook-form';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignupMutation } from '@/hooks/queries/useSignupMutation';
import { useSnackBar } from '@/providers/SnackBarProvider';

import {
  // checkEmailDuplicate,
  getErrorMessage,
  isPasswordMatch,
  isValidEmail,
  isValidNickname,
  isValidPassword,
} from '@/utils/validation.utils';

export interface SignupFormInputs {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
}

export const useSignupForm = () => {
  const { mutate: signup, isPending } = useSignupMutation();
  const { showSnack } = useSnackBar();

  // const [lastCheckedEmail, setLastCheckedEmail] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SignupFormInputs>({
    mode: 'onBlur',
  });

  const watchEmail = watch('email');
  const watchNickname = watch('nickname');
  const watchPassword = watch('password');
  const watchPasswordConfirm = watch('passwordConfirm');
  const navigate = useNavigate();

  // const emailChecked = lastCheckedEmail === watchEmail && !!watchEmail; // 중복 체크 “유효 여부 유지”

  // 폼 유효성 검사
  const isFormValid = useMemo(() => {
    const allFieldsFilled =
      !!watchEmail?.trim() &&
      !!watchNickname?.trim() &&
      !!watchPassword?.trim() &&
      !!watchPasswordConfirm?.trim();
    return allFieldsFilled && isValid; //  && emailChecked
  }, [
    watchEmail,
    watchNickname,
    watchPassword,
    watchPasswordConfirm,
    isValid,
    // emailChecked,
  ]);

  // const handleEmailCheck = async (email: string) => {
  //   try {
  //     const isDuplicate = await checkEmailDuplicate(email);
  //     console.log('isDuplicate: ', isDuplicate);

  //     if (isDuplicate) {
  //       setError('email', { message: '이미 사용 중인 이메일입니다' });
  //       return false;
  //     }
  //     clearErrors('email');
  //     setLastCheckedEmail(email);
  //     return true;
  //   } catch (error) {
  //     const message = error instanceof Error ? error.message : '이메일 중복 확인에 실패했습니다';
  //     setError('email', { message });
  //     return false;
  //   }
  // };

  const onSubmit = (data: SignupFormInputs) => {
    signup(data, {
      onSuccess: () => {
        showSnack('회원가입이 완료되었습니다.', 'success', {
          duration: 1200,
          onClose: () => navigate('/login'),
        });
      },
    });
  };

  const registerOptions = {
    email: register('email', {
      required: '이메일을 입력해주세요',
      validate: (value) => isValidEmail(value) || '올바른 이메일 형식이 아닙니다',
    }),
    nickname: register('nickname', {
      required: '닉네임을 입력해주세요',
      validate: (value) => isValidNickname(value) || '2~8자의 한글, 영문, 숫자만 사용 가능합니다',
    }),
    password: register('password', {
      required: '비밀번호를 입력해주세요',
      validate: (value) => isValidPassword(value) || '8~16자의 영문과 숫자를 사용해주세요',
    }),
    passwordConfirm: register('passwordConfirm', {
      required: '비밀번호 확인을 입력해주세요',
      validate: (value) => isPasswordMatch(watchPassword, value) || '비밀번호가 일치하지 않습니다',
    }),
  };

  return {
    registerOptions,
    errors,
    isSubmitting: isPending,
    isFormValid,
    // emailChecked,
    handleSubmit: handleSubmit(onSubmit),
    // handleEmailCheck,
    getErrorMessage,
    watchEmail,
    watchNickname,
  };
};
