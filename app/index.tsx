import React from "react";

import { DashboardHeader, NotesList, ScreenContainer } from "components";
import { NotesListProvider, useNotesContext } from "contexts";
import {
  useCreateEmptyNoteMutation,
  useNavigateNote,
  useNavigateProfile,
} from "hooks";

export default function NotesPage() {
  const { notes } = useNotesContext();
  const onPressCreate = useCreateEmptyNoteMutation();
  const onNavigateNote = useNavigateNote();
  const onPressProfile = useNavigateProfile();

  return (
    <>
      <DashboardHeader {...{ onPressProfile, onPressCreate }} />
      <ScreenContainer withoutBeautifulPadding type="fixed">
        <NotesListProvider notes={notes}>
          <NotesList onPressNote={onNavigateNote} />
        </NotesListProvider>
      </ScreenContainer>
    </>
  );
}
