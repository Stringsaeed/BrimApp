import React from "react";

import { DashboardHeader, NotesList, ScreenContainer } from "components";
import { NotesListProvider, useNotesContext } from "contexts";
import {
  useCreateEmptyNoteMutation,
  useNavigateNote,
  useNavigateProfile,
} from "hooks";

export default function DashboardScreen() {
  const { notes } = useNotesContext();
  const filteredNotes = notes.filter(
    (note) => ![note.is_archived, note.is_trashed].some((x) => x)
  );

  const onPressCreate = useCreateEmptyNoteMutation();
  const onNavigateNote = useNavigateNote();
  const onPressProfile = useNavigateProfile();

  return (
    <NotesListProvider notes={filteredNotes}>
      <DashboardHeader {...{ onPressProfile, onPressCreate }} />
      <ScreenContainer withoutBeautifulPadding type="fixed">
        <NotesList onPressNote={onNavigateNote} />
      </ScreenContainer>
    </NotesListProvider>
  );
}
