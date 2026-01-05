import { create } from 'zustand';

type ProfileImageState = {
  profileImageUrl: string | null; // 서버에 저장된 URL
  previewUrl: string | null; // 브라우저 미리보기용 URL
  file: File | null; // 서버 업로드용 파일
  setPreviewUrl: (file: File) => void; // 프리뷰 생성
  setProfileImageUrl: (url: string) => void; // 서버 업로드 성공 후 URL 저장
  setFile: (file: File | null) => void; // MyProfilePage에서 서버 업로드용 파일 저장
  clearPreview: () => void;
  reset: () => void;
};

export const useProfileImageStore = create<ProfileImageState>((set, get) => ({
  profileImageUrl: null,
  previewUrl: null,
  file: null,

  setPreviewUrl: (file) => {
    const prev = get().previewUrl;
    if (prev) {
      URL.revokeObjectURL(prev);
    }

    const url = URL.createObjectURL(file);
    set({ previewUrl: url, file });
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

  setFile: (file) => set({ file }), // 서버 업로드용 파일 저장

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
      file: null,
    });
  },
}));
