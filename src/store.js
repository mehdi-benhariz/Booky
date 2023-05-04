import { create } from "zustand";

export const useStore = create((set) => ({
  isEditNoteModalOpen: false,
  toggleEditNoteModal: () =>
    set((state) => ({ isEditNoteModalOpen: !state.isEditNoteModalOpen })),
  currentNote: {},
  setCurrentNote: (note) => set(() => ({ currentNote: note })),
}));
