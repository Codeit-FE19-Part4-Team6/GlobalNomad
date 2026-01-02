// src/hooks/useSignupMutation.ts
import { useMutation } from '@tanstack/react-query';
import usersApi from '@/apis/users';
import type { UserSignupRequest } from '@/apis/type';

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: (credentials: UserSignupRequest) => usersApi.signup(credentials),
  });
};
