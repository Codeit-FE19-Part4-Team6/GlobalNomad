// src/hooks/useLoginMutation.ts
import { useMutation } from '@tanstack/react-query';
import type { LoginRequest, LoginResponse } from '@/apis/type';
import { useAuthStore } from '@/stores/authStore';
import { http } from '@/apis/http';
import { getLoginErrorMessage } from '@/utils/errorMessages';
import { useSnackBar } from '@/providers/SnackBarProvider';

export const useLoginMutation = () => {
  const login = useAuthStore((state) => state.login);
  const { showSnack } = useSnackBar();

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await http.post<LoginResponse>('/auth/login', data);
      return response.data;
    },
    onSuccess: (data) => {
      // Zustand store의 login 함수 호출
      login(data.accessToken, data.refreshToken, data.user);
    },
    onError: (error) => {
      const message = getLoginErrorMessage(error);
      showSnack(message, 'error', {
        duration: 3000,
      });
    },
  });
};
