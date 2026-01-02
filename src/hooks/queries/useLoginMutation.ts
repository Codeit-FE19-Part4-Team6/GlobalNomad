// src/hooks/useLoginMutation.ts
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { token } from '@/apis/auth/token';
import usersApi from '@/apis/users';
import type { LoginRequest } from '@/apis/type';

export const useLoginMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => usersApi.login(credentials),
    onSuccess: (response) => {
      token.setTokens(response.accessToken, response.refreshToken);
      navigate('/');
    },
  });
};
