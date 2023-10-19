import React from "react";

import { NotesList } from "components";
import { NotesListProvider } from "contexts";
import { useFilterNotes, useNavigateNote } from "hooks";

export default function TrashedNotesScreen() {
  const notes = useFilterNotes(useFilterNotes.filterTypes.Trashed);
  const onNavigateNote = useNavigateNote();

  return (
    <NotesListProvider notes={notes}>
      <NotesList onPressNote={onNavigateNote} />
    </NotesListProvider>
  );
}
