import { useMutation } from "@tanstack/react-query";
import database from "@react-native-firebase/database";

import { Note } from "types";

async function createNote(input: Omit<Note, "id">) {
  await database().ref(`/notes/${input.user}`).push(input);
}

export default function useCreateNoteMutation() {
  return useMutation(createNote);
}
