import React from "react";

import { DashboardHeader, NotesList, ScreenContainer } from "components";
import { NotesListProvider } from "contexts";
import {
  useCreateEmptyNoteMutation,
  useFilterNotes,
  useNavigateNote,
  useNavigateProfile,
} from "hooks";

export default function DashboardScreen() {
  const createEmptyNoteMutation = useCreateEmptyNoteMutation();
  const onNavigateNote = useNavigateNote();
  const onPressProfile = useNavigateProfile();
  const notes = useFilterNotes(useFilterNotes.filterTypes.Main);

  return (
    <NotesListProvider notes={notes}>
      <DashboardHeader
        onPressCreate={createEmptyNoteMutation.mutate}
        onPressProfile={onPressProfile}
      />
      <ScreenContainer withoutBeautifulPadding handleHeaderHeight type="fixed">
        <NotesList onPressNote={onNavigateNote} />
      </ScreenContainer>
    </NotesListProvider>
  );
}
