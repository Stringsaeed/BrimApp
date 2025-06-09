import { observer } from "@legendapp/state/react";
import React from "react";

import { DashboardHeader, NotesList } from "@/components";
import { NotesListProvider } from "@/contexts";
import {
  useCreateEmptyNoteMutation,
  useNavigateNote,
  useNavigateProfile,
  useObserveNotes,
} from "@/hooks";

function DashboardScreen() {
  const notes = useObserveNotes(
    (note) => note.status === "published" || note.status === "draft"
  );
  const createEmptyNoteMutation = useCreateEmptyNoteMutation();
  const onNavigateNote = useNavigateNote();
  const onPressProfile = useNavigateProfile();

  return (
    <NotesListProvider notes={notes}>
      <DashboardHeader
        onPressCreate={createEmptyNoteMutation.mutate}
        onPressProfile={onPressProfile}
      />
      <NotesList onPressNote={onNavigateNote} />
    </NotesListProvider>
  );
}

export default observer(DashboardScreen);
