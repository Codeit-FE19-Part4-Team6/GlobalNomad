// src/hooks/useSignupMutation.ts
import { useMutation } from '@tanstack/react-query';
import usersApi from '@/apis/users';
import type { UserSignupRequest } from '@/apis/type';
import { getSignupErrorMessage } from '@/utils/errorMessages';
import { useSnackBar } from '@/providers/SnackBarProvider';

export const useSignupMutation = () => {
  const { showSnack } = useSnackBar();
  return useMutation({
    mutationFn: (credentials: UserSignupRequest) => usersApi.signup(credentials),
    onError: (error) => {
      const message = getSignupErrorMessage(error);
      showSnack(message, 'error', {
        duration: 3000,
      });
    },
  });
};
