import { useNotesStore } from "stores";

export default function useInMemoryNotes() {
  return useNotesStore((state) => state.notes);
}
