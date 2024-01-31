import { useMutation } from "@tanstack/react-query";
import * as LocalAuthentication from "expo-local-authentication";

import { NoteService, Sentry } from "services";
import { Note } from "types";

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
    await NoteService.update(note.id!, { is_private: isPrivate });
    return isPrivate;
  } catch (e) {
    Sentry.captureException(e);
    return false;
  }
}

export default function useNotePrivacyMutation() {
  return useMutation(toggleNotePrivacy);
}
