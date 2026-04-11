import Archived from "./ArchivedNotes/ArchivedNotesScreen";
import Note from "./Note/NoteScreen";
import Trashed from "./TrashedNotes/TrashedNotesScreen";

const NotesScreens = {
  Archived,
  Trashed,
  Note,
} as const;

export default NotesScreens;
