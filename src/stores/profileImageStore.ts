import { create } from 'zustand';

type ProfileImageState = {
  profileImageUrl: string | null;
  previewUrl: string | null;
  setPreviewUrl: (file: File) => void; // 미리보기 생성
  setProfileImageUrl: (url: string) => void; // 서버 업로드 성공 후 URL 저장
  clearPreview: () => void; // 미리보기 초기화
  reset: () => void;
};

export const useProfileImageStore = create<ProfileImageState>((set, get) => ({
  profileImageUrl: null,
  previewUrl: null,

  setPreviewUrl: (file) => {
    const prev = get().previewUrl;
    if (prev) {
      URL.revokeObjectURL(prev);
    }

    const url = URL.createObjectURL(file);
    set({ previewUrl: url });
  },

  setProfileImageUrl: (url) => {
    const prev = get().previewUrl;
    if (prev) {
      URL.revokeObjectURL(prev);
    }

    set({
      profileImageUrl: url,
      previewUrl: null,
    });
  },

  clearPreview: () => {
    const prev = get().previewUrl;
    if (prev) {
      URL.revokeObjectURL(prev);
    }
    set({ previewUrl: null });
  },

  reset: () => {
    const { previewUrl } = get();
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    set({
      previewUrl: null,
      profileImageUrl: null,
    });
  },
}));
