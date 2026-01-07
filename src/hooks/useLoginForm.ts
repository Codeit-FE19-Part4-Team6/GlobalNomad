// src/hooks/useLoginForm.ts (React Query 버전)
import { useForm } from 'react-hook-form';
import { useMemo } from 'react';
import { getErrorMessage, isValidEmail, isValidPassword } from '@/utils/validation.utils';
import type { LoginRequest } from '@/apis/type';
import { useLoginMutation } from '@/hooks/queries/useLoginMutation';
import { useNavigate } from 'react-router-dom';
import { useSnackBar } from '@/providers/SnackBarProvider';
import { useProfileImageStore } from '@/stores/profileImageStore';

export const useLoginForm = () => {
  const { mutate: login, isPending } = useLoginMutation();
  const { showSnack } = useSnackBar();
  const setProfileImageUrl = useProfileImageStore((state) => state.setProfileImageUrl);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<LoginRequest>({
    mode: 'onBlur',
  });

  const navigate = useNavigate();
  const watchEmail = watch('email');
  const watchPassword = watch('password');

  const isFormValid = useMemo(() => {
    const allFieldsFilled = !!watchEmail?.trim() && !!watchPassword?.trim();
    return allFieldsFilled && isValid;
  }, [watchEmail, watchPassword, isValid]);

  const onSubmit = (data: LoginRequest) => {
    login(data, {
      onSuccess: (res) => {
        if (res.user.profileImageUrl) {
          setProfileImageUrl(res.user.profileImageUrl);
        }
        showSnack('로그인이 완료되었습니다.', 'success', {
          duration: 1200,
          onClose: () => navigate('/'),
        });
      },
    });
  };
  const registerOptions = {
    email: register('email', {
      required: '이메일을 입력해주세요',
      validate: (value) => isValidEmail(value) || '올바른 이메일 형식이 아닙니다',
    }),
    password: register('password', {
      required: '비밀번호를 입력해주세요',
      validate: (value) => isValidPassword(value) || '8자 이상, 영문과 숫자를 포함해야 합니다',
    }),
  };
  return {
    registerOptions,
    errors,
    isSubmitting: isPending,
    isFormValid,
    handleSubmit: handleSubmit(onSubmit),
    getErrorMessage,
  };
};
