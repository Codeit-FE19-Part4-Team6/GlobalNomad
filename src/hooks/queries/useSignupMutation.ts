// src/hooks/useSignupMutation.ts
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import usersApi from '@/apis/users';
import type { UserSignupRequest } from '@/apis/type';

export const useSignupMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: UserSignupRequest) => usersApi.signup(credentials),
    onSuccess: () => {
      navigate('/login');
    },
  });
};
