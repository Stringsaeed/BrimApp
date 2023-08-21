import {
  push,
  ref,
  remove,
  update,
  get,
  onValue,
  off,
} from "firebase/database";

import { database } from "config";
import { Auth } from "services/auth";
import { Note, noteSchema, notesSchema } from "types";

export const NoteService = {
  listenForChanges: (callback: (notes: Note[]) => void) => {
    const userId = Auth.getCurrentUser()?.uid;
    if (!userId) {
      return () => {};
    }
    const _ref = ref(database, `/notes/${userId}`);
    onValue(_ref, (snapshot) => {
      const snapshotValue = snapshot.val();
      if (!snapshotValue) {
        callback([]);
        return;
      }
      const data: unknown[] = [];
      snapshot.forEach((snapshot) => {
        data.push({
          ...snapshot.val(),
          id: snapshot.key,
          user: userId,
        });
        return undefined;
      });

      const notes = notesSchema.parse(data);
      callback(notes);
    });
    return () => off(_ref);
  },
  get: async (id: string) => {
    const userId = Auth.getCurrentUser()?.uid;
    if (!userId) throw new Error("User not found");
    // const ref = database().ref(`/notes/${userId}/${id}`);
    const _ref = ref(database, `/notes/${userId}/${id}`);
    const snapshot = await get(_ref);
    const snapshotValue = snapshot.val();
    return noteSchema.parse({
      ...snapshotValue,
      id: snapshot.key,
      user: userId,
    });
  },
  update: async (id: string, input: Partial<Note>) => {
    const userId = Auth.getCurrentUser()?.uid;
    if (!userId) throw new Error("User not found");
    await update(ref(database, `/notes/${userId}/${id}`), input);
  },
  delete: async (id: string) => {
    const userId = Auth.getCurrentUser()?.uid;
    if (!userId) throw new Error("User not found");
    return await remove(ref(database, `/notes/${userId}/${id}`));
  },
  create: async (note: Omit<Note, "id">) => {
    const _ref = push(
      ref(database, `/notes/${Auth.getCurrentUser()?.uid}`),
      note
    );
    return await NoteService.get(_ref.key ?? "");
  },
};
