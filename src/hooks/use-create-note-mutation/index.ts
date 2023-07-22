import database from "@react-native-firebase/database";
import { useMutation } from "@tanstack/react-query";

import { Note } from "types";

async function createNote(input: Omit<Note, "id">) {
  return await database().ref(`/notes/${input.user}`).push(input);
}

export default function useCreateNoteMutation() {
  return useMutation(createNote);
}