import React from "react";

import { DashboardHeader, NotesList, ScreenContainer } from "components";
import { NotesListProvider } from "contexts";
import {
  useCreateEmptyNoteMutation,
  useFilterNotes,
  useNavigateNote,
  useNavigateProfile,
  useSearchableNotes,
} from "hooks";

export default function DashboardScreen() {
  const createEmptyNoteMutation = useCreateEmptyNoteMutation();
  const onNavigateNote = useNavigateNote();
  const onPressProfile = useNavigateProfile();
  const mainNotes = useFilterNotes(useFilterNotes.filterTypes.Main);
  const [notes, { onSearchValueChange, searchValue }] =
    useSearchableNotes(mainNotes);

  return (
    <NotesListProvider notes={notes}>
      <DashboardHeader
        onPressCreate={createEmptyNoteMutation.mutate}
        onPressProfile={onPressProfile}
      />
      <ScreenContainer withoutBeautifulPadding handleHeaderHeight type="fixed">
        <NotesList
          onSearchValueChange={onSearchValueChange}
          onPressNote={onNavigateNote}
          searchValue={searchValue}
        />
      </ScreenContainer>
    </NotesListProvider>
  );
}
