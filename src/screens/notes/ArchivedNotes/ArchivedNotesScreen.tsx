import React from "react";

import { NotesList, ScreenContainer } from "components";
import { NotesListProvider } from "contexts";
import { useFilterNotes, useNavigateNote } from "hooks";

export default function ArchivedNotesScreen() {
  const notes = useFilterNotes(useFilterNotes.filterTypes.Archived);

  const onNavigateNote = useNavigateNote();

  return (
    <ScreenContainer handleHeaderHeight withoutBeautifulPadding type="fixed">
      <NotesListProvider notes={notes}>
        <NotesList onPressNote={onNavigateNote} />
      </NotesListProvider>
    </ScreenContainer>
  );
}
