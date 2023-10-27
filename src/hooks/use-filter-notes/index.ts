import { useMemo } from "react";

import { useNotesContext } from "contexts/notes";
import { Note } from "types";

export enum FilterType {
  Main,
  Archived,
  Trashed,
}

const isArchived = (note: Note) => note.status === "archived";

const isTrashed = (note: Note) => note.status === "trashed";

function getFilterFunction(type: FilterType) {
  switch (type) {
    case FilterType.Archived:
      return isArchived;
    case FilterType.Trashed:
      return isTrashed;
    default:
      return (note: Note) => !isArchived(note) && !isTrashed(note);
  }
}
function useFilterNotes(filterType: FilterType = FilterType.Main) {
  const { notes } = useNotesContext();

  return useMemo(() => {
    const filterFunction = getFilterFunction(filterType);
    return notes.filter(filterFunction);
  }, [filterType, notes]);
}

useFilterNotes.filterTypes = FilterType;

export default useFilterNotes;
