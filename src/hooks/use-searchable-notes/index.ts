import { useState } from "react";
import { Note } from "@/types/notes";

export default function useSearchableNotes(notes: Note[]) {
  const [searchText, setSearchText] = useState("");
  const filteredNotes = notes.filter(
    (note) =>
      note.title?.toLowerCase()?.includes(searchText.toLowerCase()) ||
      note.note?.toLowerCase()?.includes(searchText.toLowerCase())
  );

  const handleTextChange = (value: string) => {
    setSearchText(value);
  };

  return [
    filteredNotes,
    { onSearchValueChange: handleTextChange, searchValue: searchText },
  ] as const;
}
