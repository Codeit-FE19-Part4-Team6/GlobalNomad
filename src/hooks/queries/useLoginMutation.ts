// src/hooks/useLoginMutation.ts
import { useMutation } from '@tanstack/react-query';
import { token } from '@/apis/auth/token';
import usersApi from '@/apis/users';
import type { LoginRequest } from '@/apis/type';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (credentials: LoginRequest) => usersApi.login(credentials),
    onSuccess: (response) => {
      token.setTokens(response.accessToken, response.refreshToken);
    },
  });
};
