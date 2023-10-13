import { useNavigation } from "@react-navigation/native";
import { authenticateAsync } from "expo-local-authentication";

import { Routes } from "routers";
import { Note } from "types";

export default function useNavigateNote() {
  const router = useNavigation();
  const onNavigateNote = async (note: Note) => {
    if (note.is_private) {
      const { success } = await authenticateAsync({
        disableDeviceFallback: false,
      });
      if (!success) {
        return;
      }
    }

    router.navigate(Routes.Note, { id: note.id });
  };

  return onNavigateNote;
}
