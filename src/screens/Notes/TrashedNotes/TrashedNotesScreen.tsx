import React from "react";

import { NotesList } from "components";
import { NotesListProvider } from "contexts";
import { useNavigateNote, useObserveNotes } from "hooks";

export default function TrashedNotesScreen() {
  const notes = useObserveNotes((note) => note.status === "trashed");
  const onNavigateNote = useNavigateNote();

  return (
    <NotesListProvider notes={notes}>
      <NotesList onPressNote={onNavigateNote} />
    </NotesListProvider>
  );
}
