import { useMutation } from "@tanstack/react-query";
import * as LocalAuthentication from "expo-local-authentication";
import { NoteService } from "@/services/notes/notes";
import { Sentry } from "@/services/sentry";
import { Note } from "@/types/notes";

async function toggleNotePrivacy({ note }: { note: Note }) {
  try {
    let isPrivate = note.is_private;
    if (isPrivate) {
      isPrivate = false;
    } else {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Please we need this",
        disableDeviceFallback: true,
        cancelLabel: "cancel",
      });
      if (!result.success) {
        throw new Error("Authentication failed");
      }
      isPrivate = true;
    }
    if (isPrivate === note.is_private) {
      return isPrivate;
    }
    NoteService.update(note.id, { is_private: isPrivate });
    return isPrivate;
  } catch (e) {
    Sentry.captureException(e);
    return false;
  }
}

export default function useNotePrivacyMutation() {
  return useMutation({ mutationFn: toggleNotePrivacy });
}
