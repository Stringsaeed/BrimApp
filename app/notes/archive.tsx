import { authenticateAsync } from "expo-local-authentication";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";

import { ArchivedNotesHeader, NotesList, ScreenContainer } from "components";
import { useArchivedNotesQuery } from "hooks";
import { Note } from "types";

export default function ArchiveNotesPage() {
  const { data } = useArchivedNotesQuery();
  const notes = useMemo<Note[]>(() => {
    if (!data) return [];
    const _notes: Note[] = [];
    data.forEach((note) => {
      _notes.push({
        ...note.val(),
        id: note.key,
      });
      return undefined;
    });
    return _notes;
  }, [data]);

  const router = useRouter();
  const onPressNote = async (note: Note) => {
    if (note.is_private) {
      const { success } = await authenticateAsync({
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

  if (!data) return null;

  return (
    <>
      <ArchivedNotesHeader />
      <ScreenContainer withoutBeautifulPadding type="fixed">
        <NotesList notes={notes} onPressNote={onPressNote} />
      </ScreenContainer>
    </>
  );
}
