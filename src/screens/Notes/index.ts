import Archived from "./ArchivedNotes";
import Note from "./Note";
import Trashed from "./TrashedNotes";

const NotesScreens = {
  Archived,
  Trashed,
  Note,
} as const;

export default NotesScreens;
