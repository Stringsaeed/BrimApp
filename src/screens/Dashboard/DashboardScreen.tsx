import { observer } from "@legendapp/state/react";
import React from "react";
import DashboardHeader from "@/components/dashboard-header";
import { useImmersiveOverlay } from "@/components/immersive-overlay/store";
import NotesList from "@/components/notes-list";
import { NotesListProvider } from "@/contexts/notes-list";
import useCreateEmptyNoteMutation from "@/hooks/use-create-empty-note-mutation";
import useNavigateNote from "@/hooks/use-navigate-note";
import useNavigateProfile from "@/hooks/use-navigate-profile";
import useObserveNotes from "@/hooks/use-observe-notes";

function DashboardScreen() {
  const notes = useObserveNotes(
    (note) => note.status === "published" || note.status === "draft"
  );
  const createEmptyNoteMutation = useCreateEmptyNoteMutation();
  const onNavigateNote = useNavigateNote();
  const onPressProfile = useNavigateProfile();
  const { immerse } = useImmersiveOverlay();
  return (
    <NotesListProvider notes={notes}>
      <DashboardHeader
        onPressCreate={() => {
          immerse();
          createEmptyNoteMutation.mutate();
        }}
        onPressProfile={onPressProfile}
      />
      <NotesList onPressNote={onNavigateNote} />
    </NotesListProvider>
  );
}
export default observer(DashboardScreen);
