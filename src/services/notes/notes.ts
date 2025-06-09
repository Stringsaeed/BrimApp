/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { generateId, notes$ } from "@/services/database";
import type { Note } from "@/types";

export const NoteService = {
  create: (input: Omit<Note, "id">): Note => {
    const newId = generateId();
    notes$[newId].assign({
      ...input,
      id: newId,
    });

    const newNote = notes$.get() ?? {};

    if (!newNote[newId]) {
      throw new Error("=== Failed to create note");
    }

    return newNote[newId] as unknown as Note;
  },
  update: (id: string, input: Partial<Note>) => {
    const note = notes$[id];
    // @ts-expect-error - TODO: fix this
    return notes$[id].assign({
      ...note,
      ...input,
      id,
    });
  },
  delete: (id: string) => {
    return notes$[id].assign({
      deleted_at: new Date().toISOString(),
    });
  },
  get: (id: string) => {
    const _notes = notes$.get();
    return _notes?.[id] as unknown as Note;
  },
  deleteAll: () => {
    return notes$.set({});
  },
};
