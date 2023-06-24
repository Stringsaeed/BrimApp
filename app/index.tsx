import { useRouter } from "expo-router";
import React from "react";

import { DashboardHeader, NotesList, ScreenContainer } from "components";
import { NotesListProvider, useNotesContext } from "contexts";
import { useNavigateNote } from "hooks";

export default function NotesPage() {
  const router = useRouter();
  const { addNote, notes } = useNotesContext();

  const onNavigateNote = useNavigateNote();

  const onPressCreate = async () => {
    const newNote = {
      title: "",
      note: "",
    };
    const note = await addNote(newNote, true);

    router.push({ pathname: `/notes/${note.id}` });
  };

  const onPressProfile = () => {
    router.push("/profile");
  };

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
