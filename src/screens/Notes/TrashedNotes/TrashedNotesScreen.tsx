import React from "react";
import NotesList from "@/components/notes-list";
import { NotesListProvider } from "@/contexts/notes-list";
import useNavigateNote from "@/hooks/use-navigate-note";
import useObserveNotes from "@/hooks/use-observe-notes";
export default function TrashedNotesScreen() {
  const notes = useObserveNotes((note) => note.status === "trashed");
  const onNavigateNote = useNavigateNote();
  return (
    <NotesListProvider notes={notes}>
      <NotesList onPressNote={onNavigateNote} />
    </NotesListProvider>
  );
}
