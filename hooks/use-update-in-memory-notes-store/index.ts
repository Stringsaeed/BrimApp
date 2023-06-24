import uniqBy from "lodash.uniqby";
import { useCallback } from "react";

import useInMemoryNotes from "hooks/use-in-memory-notes";
import { useNotesStore } from "stores";
import { Note } from "types";

function getFinalNotes(previousNotes: Note[], notes: Note[]) {
  return uniqBy([...previousNotes, ...notes], "id");
}

export default function useUpdateInMemoryNotesStore() {
  const previousNotes = useInMemoryNotes();
  const setNotes = useNotesStore((state) => state.setNotes);
  const updateNotesStore = useCallback(
    (notes: Note[]) => {
      setNotes(getFinalNotes(previousNotes, notes));
    },
    [previousNotes, setNotes]
  );

  return updateNotesStore;
}
