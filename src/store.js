import { create } from "zustand";

export const useStore = create((set) => ({
  //edit modal
  isEditNoteModalOpen: false,
  toggleEditNoteModal: () =>
    set((state) => ({ isEditNoteModalOpen: !state.isEditNoteModalOpen })),
  currentNote: {},
  setCurrentNote: (note) => set(() => ({ currentNote: note })),
  //filter modal
  isFilterModalOpen: false,
  toggleFilterModal: () =>
    set((state) => ({ isFilterModalOpen: !state.isFilterModalOpen })),
  selectedFilters: [],
  setSelectedFilters: (filters) => set(() => ({ selectedFilters: filters })),

  //update signal
  hasUpdated: false,
  toggleHasUpdated: () => set((state) => ({ hasUpdated: !state.hasUpdated })),

  //delete modal
  isDeleteModalOpen: false,
  closeModal: () => set(() => ({ isDeleteModalOpen: false })),
  openModal: () => set(() => ({ isDeleteModalOpen: true })),
  isBookDeleted: false,
  toggleIsBookDeleted: () =>
    set((state) => ({ isBookDeleted: !state.isBookDeleted })),
  bookIdToDelete: "",
  setBookIdToDelete: (id) => set(() => ({ bookIdToDelete: id })),
}));
