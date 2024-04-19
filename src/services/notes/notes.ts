import { notesState } from "services/database";
import { Note } from "types";

export const NoteService = {
  create: (input: Omit<Note, "id">): Note => {
    const newId = Math.random().toString(36).substr(2, 9);
    const observedNotes = notesState.notes.set((notes) => {
      notes.push({
        ...input,
        id: newId,
      });

      return notes;
    });

    const newNote = observedNotes
      .get()
      .find((note) => note.id === newId) as Note;

    return newNote;
  },
  update: (id: string, input: Partial<Note>) => {
    return notesState.notes.set((notes) => {
      const newNotes = [...notes];
      const index = newNotes.findIndex((note) => note.id === id);
      if (index === -1) return notes;
      newNotes[index] = {
        ...notes[index],
        ...input,
      };
      return newNotes;
    });
  },
  delete: (id: string) => {
    return notesState.notes.set((notes) => {
      return notes.filter((note) => note.id !== id);
    });
  },
  get: (id: string) => {
    return notesState.notes.get().find((note) => note.id === id);
  },
  deleteAll: () => {
    return notesState.notes.set([]);
  },
};
