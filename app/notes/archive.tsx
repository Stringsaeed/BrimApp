import React from "react";

import { NotesList, ScreenContainer } from "components";
import { NotesListProvider } from "contexts";
import { useArchivedNotesQuery, useNavigateNote } from "hooks";

export default function ArchiveNotesPage() {
  const { data } = useArchivedNotesQuery();

  const onNavigateNote = useNavigateNote();

  if (!data) return null;

  return (
    <>
      <ScreenContainer withoutBeautifulPadding type="fixed">
        <NotesListProvider notes={data}>
          <NotesList onPressNote={onNavigateNote} />
        </NotesListProvider>
      </ScreenContainer>
    </>
  );
}
