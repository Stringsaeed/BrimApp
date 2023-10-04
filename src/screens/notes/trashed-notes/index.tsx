import React from "react";

import { NotesList, ScreenContainer } from "components";
import { NotesListProvider, useNotesContext } from "contexts";
import { useNavigateNote } from "hooks";

export default function TrashedNotesView() {
  const { notes } = useNotesContext();
  const data = notes.filter(
    (note) => note.is_trashed || note.status === "trashed"
  );

  const onNavigateNote = useNavigateNote();

  return (
    <ScreenContainer
      handleHeaderHeight={false}
      withoutBeautifulPadding
      type="fixed"
    >
      <NotesListProvider notes={data}>
        <NotesList pullToActionEnabled={false} onPressNote={onNavigateNote} />
      </NotesListProvider>
    </ScreenContainer>
  );
}
