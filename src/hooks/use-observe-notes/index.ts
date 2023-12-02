import { Q } from "@nozbe/watermelondb";
import { useDatabase } from "@nozbe/watermelondb/react";
import { useEffect, useState } from "react";

import { NoteModel } from "models";

export default function useObserveNotes(status: string) {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const database = useDatabase();
  const notesCollection = database
    .get<NoteModel>("notes")
    .query(Q.sortBy("updated_at", Q.desc), Q.where("status", status));

  useEffect(() => {
    if (!notesCollection) return;
    const subscription = notesCollection
      .observeWithColumns([
        "updated_at",
        "created_at",
        "title",
        "note",
        "status",
      ])
      .subscribe((value) => {
        setNotes(value);
      });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return notes;
}
