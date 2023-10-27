import database from "@react-native-firebase/database";

import { Auth } from "services/auth";
import { Note, noteSchema, notesSchema } from "types";

export const NoteService = {
  listenForChanges: (callback: (notes: Note[]) => void) => {
    const userId = Auth.getCurrentUser()?.uid;
    if (!userId) {
      return () => {};
    }
    const ref = database().ref(`/notes/${userId}`).orderByChild("updated_at");
    ref.on("value", (snapshot) => {
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

      const notes = notesSchema.parse(data).reverse();
      callback(notes);
    });
    return () => ref.off("value");
  },
  get: async (id: string) => {
    const userId = Auth.getCurrentUser()?.uid;
    if (!userId) throw new Error("User not found");
    const ref = database().ref(`/notes/${userId}/${id}`);
    const snapshot = await ref.once("value");
    const snapshotValue = snapshot.val();
    return noteSchema.parse({
      ...snapshotValue,
      id: snapshot.key,
      user: userId,
    });
  },
  delete: async (id: string) => {
    const userId = Auth.getCurrentUser()?.uid;
    if (!userId) throw new Error("User not found");
    await database().ref(`/notes/${userId}/${id}`).update({
      deleted_at: new Date().getTime(),
    });
  },
  update: async (id: string, input: Partial<Note>) => {
    const userId = Auth.getCurrentUser()?.uid;
    if (!userId) throw new Error("User not found");
    await database().ref(`/notes/${userId}/${id}`).update(input);
  },
  create: async (input: Omit<Note, "id">) => {
    const ref = await database().ref(`/notes/${input.user_id}`).push(input);
    return await NoteService.get(ref.key ?? "");
  },
};
