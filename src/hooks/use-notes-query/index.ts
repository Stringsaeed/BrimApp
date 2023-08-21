import { useEffect, useState } from "react";

import { NoteService } from "services";
import { Note } from "types";

export default function useNotesQuery() {
  const [data, setData] = useState<Note[]>([]);

  useEffect(() => {
    return NoteService.listenForChanges((notes) => {
      setData(notes);
    });
  }, []);

  return { data };
}
