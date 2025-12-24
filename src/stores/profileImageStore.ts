import { create } from 'zustand';

type ProfileImageState = {
  file: File | null;
  previewUrl: string | null;
  setFile: (file: File | null) => void;
  reset: () => void;
};

export const useProfileImageStore = create<ProfileImageState>((set, get) => ({
  file: null,
  previewUrl: null,

  setFile: (file) => {
    const prevUrl = get().previewUrl;
    if (prevUrl) {
      URL.revokeObjectURL(prevUrl);
    }

    set({
      file,
      previewUrl: file ? URL.createObjectURL(file) : null,
    });
  },

  reset: () => {
    const prevUrl = get().previewUrl;
    if (prevUrl) {
      URL.revokeObjectURL(prevUrl);
    }
    set({ file: null, previewUrl: null });
  },
}));
