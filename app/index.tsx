import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";
import React from "react";

import { DashboardHeader, NotesList, ScreenContainer } from "components";
import { useNotesContext } from "contexts";
import { Note } from "types";

export default function NotesPage() {
  const router = useRouter();
  const { addNote, notes } = useNotesContext();

  const onPressNote = async (note: Note) => {
    if (note.is_private) {
      const { success } = await LocalAuthentication.authenticateAsync({
        disableDeviceFallback: false,
      });
      if (!success) {
        return;
      }
    }

    router.push({
      params: { note: JSON.stringify(note) },
      pathname: `/notes/${note.id}`,
    });
  };

  const onPressCreate = async () => {
    const newNote = {
      title: "",
      note: "",
    };
    const note = await addNote(newNote, true);

    router.push({
      params: { note: JSON.stringify(note) },
      pathname: `/notes/${note.id}`,
    });
  };

  const onPressProfile = () => {
    router.push("/profile");
  };

  return (
    <>
      <DashboardHeader {...{ onPressProfile, onPressCreate }} />
      <ScreenContainer withoutBeautifulPadding type="fixed">
        <NotesList onPressNote={onPressNote} notes={notes} />
      </ScreenContainer>
    </>
  );
}
