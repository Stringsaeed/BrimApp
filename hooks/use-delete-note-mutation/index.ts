import database from "@react-native-firebase/database";
import { useMutation } from "@tanstack/react-query";

import { Note } from "types";

async function deleteNote(input: Note) {
  return await database().ref(`/notes/${input.user}/${input.id}`).remove();
}

export default function useDeleteNoteMutation() {
  return useMutation(deleteNote);
}
