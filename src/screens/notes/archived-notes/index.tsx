import React from "react";

import { NotesList, ScreenContainer } from "components";
import { NotesListProvider, useNotesContext } from "contexts";
import { useNavigateNote } from "hooks";

export default function ArchivedNotesView() {
  const { notes } = useNotesContext();
  const data = notes.filter((note) => note.is_archived);

  const onNavigateNote = useNavigateNote();

  if (!data) return null;

  return (
    <ScreenContainer withoutBeautifulPadding type="fixed">
      <NotesListProvider notes={data}>
        <NotesList onPressNote={onNavigateNote} />
      </NotesListProvider>
    </ScreenContainer>
  );
}
