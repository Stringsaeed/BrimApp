import { push, ref } from "firebase/database";

import { database } from "config";

import { Note } from "../types";

export default function useNoteMutation() {
  return {
    create: async (note: Omit<Note, "id">) => {
      const noteRef = ref(database, `/notes/${note.user}`);
      const x = await push(noteRef, note);
      console.log(x);
    },
  };
}
