import { DataSnapshot } from "firebase/database";

import { Note, notesSchema } from "types";

export function getNotesFromSnapshot(snapshot: DataSnapshot | null): Note[] {
  if (!snapshot) return [];
  const notes: Record<
    string,
    {
      note?: string | null;
      created_at?: string | null;
      is_draft?: boolean | null;
      user?: string | null;
      updated_at?: string | null;
    }
  > | null = snapshot.val();

  if (!notes) return [];

  const notesArray = Object.entries(notes)
    .map(([id, note]) => ({
      ...note,
      note: note.note ?? "",
      id,
    }))
    .sort((a, b) => {
      if (!a.updated_at) return 1;
      if (!b.updated_at) return -1;
      return a.updated_at > b.updated_at ? -1 : 1;
    });

  return notesSchema.parse(notesArray);
}
