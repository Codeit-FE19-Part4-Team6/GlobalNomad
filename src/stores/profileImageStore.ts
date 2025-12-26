import { create } from 'zustand';

// 프로필 이미지 상태 타입 정의
type ProfileImageState = {
  profileImageUrl: string | null;
  setProfileImageUrl: (url: string | null) => void; // 스토어의 profileImageUrl을 업데이트
  reset: () => void;
};

export const useProfileImageStore = create<ProfileImageState>((set) => ({
  profileImageUrl: null,
  setProfileImageUrl: (url) => set({ profileImageUrl: url }), // profileImageUrl 업데이트
  reset: () => set({ profileImageUrl: null }),
}));
