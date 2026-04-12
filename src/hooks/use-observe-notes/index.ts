import { use$ } from "@legendapp/state/react";
import { useMemo } from "react";
import { notes$ } from "@/services/database";
import type { Note } from "@/types/notes";

export default function useObserveNotes(filterBy: (note: Note) => boolean) {
  const observedNotes = use$(notes$);

  const notes = useMemo(() => {
    if (!observedNotes) return [];
    return Object.values(observedNotes).filter(filterBy);
  }, [filterBy, observedNotes]);

  return notes;
}
