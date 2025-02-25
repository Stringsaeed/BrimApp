import { useSelector } from "@legendapp/state/react";

import { notes$ } from "services";
import { Note } from "types";

export default function useObserveNotes(filterBy: (note: Note) => boolean) {
  const notes = useSelector(() =>
    Object.values(notes$.get(true) ?? {}).filter(filterBy)
  );

  return notes;
}
