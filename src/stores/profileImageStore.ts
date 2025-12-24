import { create } from 'zustand';

type ProfileImageState = {
  file: File | null;
  previewUrl: string | null;
  setFile: (file: File | null) => void;
  reset: () => void;
};

export const useProfileImageStore = create<ProfileImageState>((set, get) => {
  const revokePrevUrl = () => {
    const prevUrl = get().previewUrl;
    if (prevUrl) {
      URL.revokeObjectURL(prevUrl);
    }
  };

  return {
    file: null,
    previewUrl: null,

    setFile: (file) => {
      revokePrevUrl();
      set({
        file,
        previewUrl: file ? URL.createObjectURL(file) : null,
      });
    },

    reset: () => {
      revokePrevUrl();
      set({ file: null, previewUrl: null });
    },
  };
});
