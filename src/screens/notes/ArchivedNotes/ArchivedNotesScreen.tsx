import React from "react";

import { NotesList } from "components";
import { NotesListProvider } from "contexts";
import { useFilterNotes, useNavigateNote } from "hooks";

export default function ArchivedNotesScreen() {
  const notes = useFilterNotes(useFilterNotes.filterTypes.Archived);

  const onNavigateNote = useNavigateNote();

  return (
    <NotesListProvider notes={notes}>
      <NotesList onPressNote={onNavigateNote} />
    </NotesListProvider>
  );
}
