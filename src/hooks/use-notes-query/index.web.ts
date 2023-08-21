import { useEffect, useState } from "react";

import { useAuth } from "contexts";
import { NoteService } from "services";
import { Note } from "types";

export default function useNotesQuery() {
  const { user } = useAuth();
  const [data, setData] = useState<Note[]>([]);

  useEffect(() => {
    if (!user?.uid) return;
    return NoteService.listenForChanges((notes) => {
      setData(notes);
    });
  }, [user?.uid]);

  return { data };
}
