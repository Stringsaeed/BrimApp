import React from "react";

import { NotesList, ScreenContainer } from "components";
import { NotesListProvider } from "contexts";
import { useFilterNotes, useNavigateNote, useSearchableNotes } from "hooks";

export default function TrashedNotesScreen() {
  const trashedNotes = useFilterNotes(useFilterNotes.filterTypes.Trashed);
  const [notes, { onSearchValueChange, searchValue }] =
    useSearchableNotes(trashedNotes);

  const onNavigateNote = useNavigateNote();

  return (
    <ScreenContainer withoutBeautifulPadding handleHeaderHeight type="fixed">
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
