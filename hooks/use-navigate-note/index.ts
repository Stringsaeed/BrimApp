import { authenticateAsync } from "expo-local-authentication";
import { useRouter } from "expo-router";

import { Note } from "types";

export default function useNavigateNote() {
  const router = useRouter();
  const onNavigateNote = async (note: Note) => {
    if (note.is_private) {
      const { success } = await authenticateAsync({
        disableDeviceFallback: false,
      });
      if (!success) {
        return;
      }
    }

    router.push({
      params: { note: JSON.stringify(note) },
      pathname: `/notes/${note.id}`,
    });
  };

  return onNavigateNote;
}
