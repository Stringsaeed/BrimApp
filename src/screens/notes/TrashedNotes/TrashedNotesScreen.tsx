import React from "react";

import { NotesList, ScreenContainer } from "components";
import { NotesListProvider } from "contexts";
import { useFilterNotes, useNavigateNote } from "hooks";

export default function TrashedNotesScreen() {
  const notes = useFilterNotes(useFilterNotes.filterTypes.Trashed);
  const onNavigateNote = useNavigateNote();

  return (
    <ScreenContainer withoutBeautifulPadding handleHeaderHeight type="fixed">
      <NotesListProvider notes={notes}>
        <NotesList onPressNote={onNavigateNote} />
      </NotesListProvider>
    </ScreenContainer>
  );
}
