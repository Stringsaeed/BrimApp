import { useSelector } from "@legendapp/state/react";

import { notesState } from "services";
import { Note } from "types";

export default function useObserveNotes(filterBy: (note: Note) => boolean) {
  const notes = useSelector(() => notesState.notes.get().filter(filterBy));

  return notes;
}
