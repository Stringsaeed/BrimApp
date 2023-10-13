import React from "react";

import { NotesList, ScreenContainer } from "components";
import { NotesListProvider } from "contexts";
import { useFilterNotes, useNavigateNote, useSearchableNotes } from "hooks";

export default function ArchivedNotesScreen() {
  const archivedNotes = useFilterNotes(useFilterNotes.filterTypes.Archived);
  const [notes, { onSearchValueChange, searchValue }] =
    useSearchableNotes(archivedNotes);

  const onNavigateNote = useNavigateNote();

  return (
    <ScreenContainer handleHeaderHeight withoutBeautifulPadding type="fixed">
      <NotesListProvider notes={notes}>
        <NotesList
          onSearchValueChange={onSearchValueChange}
          onPressNote={onNavigateNote}
          searchValue={searchValue}
        />
      </NotesListProvider>
    </ScreenContainer>
  );
}
