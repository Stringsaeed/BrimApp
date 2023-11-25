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

const isDeleted = (note: Note) => !!note.deleted_at;

function getFilterFunction(type: FilterType) {
  switch (type) {
    case FilterType.Archived:
      return (note: Note) => isArchived(note) && !isDeleted(note);
    case FilterType.Trashed:
      return (note: Note) => isTrashed(note) && !isDeleted(note);
    default:
      return (note: Note) =>
        !isArchived(note) && !isTrashed(note) && !isDeleted(note);
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
