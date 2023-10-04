import ArchivedNotesView from "./archived-notes";
import NoteView from "./note";
import TrashedNotesView from "./trashed-notes";

const Notes = {
  Archived: ArchivedNotesView,
  Trashed: TrashedNotesView,
  Note: NoteView,
};

export default Notes;
