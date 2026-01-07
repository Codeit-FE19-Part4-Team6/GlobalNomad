// stores/authStore.ts
import { create } from 'zustand';
import { token } from '@/apis/auth/token';
import { http } from '@/apis/http';
import type { User } from '@/apis/type';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isInitialized: boolean;
  isAuthenticated: boolean;
}

interface AuthActions {
  initialize: () => Promise<void>;
  login: (accessToken: string, refreshToken: string, user: User) => void; // user를 필수로
  logout: () => void;
  setUser: (user: User | null) => void;
  refreshUser: () => Promise<void>;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set) => ({
  // State
  user: null,
  isLoading: false,
  isInitialized: false,
  isAuthenticated: false,

  // Actions
  initialize: async () => {
    const accessToken = token.getAccessToken();

    if (!accessToken) {
      set({ isInitialized: true, isLoading: false });
      return;
    }

    set({ isLoading: true });

    try {
      // ✅ GET /users/me로 사용자 정보 조회
      const response = await http.get<User>('/users/me');
      set({
        user: response.data,
        isAuthenticated: true,
        isInitialized: true,
        isLoading: false,
      });
    } catch (error) {
      console.error('사용자 정보 조회 실패:', error);
      token.clearTokens();

      set({
        user: null,
        isAuthenticated: false,
        isInitialized: true,
        isLoading: false,
      });
    }
  },

  login: (accessToken: string, refreshToken: string, user: User) => {
    // 토큰 저장
    token.setTokens(accessToken, refreshToken);
    // 사용자 정보 저장 (로그인 API가 user를 포함해서 반환함)
    set({ user, isAuthenticated: true });
  },

  logout: () => {
    token.clearTokens();
    set({
      user: null,
      isAuthenticated: false,
    });
  },

  setUser: (user: User | null) => {
    set({ user, isAuthenticated: !!user });
  },

  refreshUser: async () => {
    try {
      // ✅ GET /users/me로 사용자 정보 갱신
      const response = await http.get<User>('/users/me');
      set({ user: response.data, isAuthenticated: true });
    } catch (error) {
      console.error('사용자 정보 새로고침 실패:', error);
      throw error;
    }
  },
}));
