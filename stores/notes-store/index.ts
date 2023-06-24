import { create } from "zustand";

import { Note } from "types";

interface NotesStore {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
}

const useNotesStore = create<NotesStore>((set) => ({
  setNotes: (notes: Note[]) => set({ notes }),
  notes: [],
}));

export default useNotesStore;
