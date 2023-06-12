import database from "@react-native-firebase/database";
import { useMutation } from "@tanstack/react-query";
import * as LocalAuthentication from "expo-local-authentication";

import { Note } from "types";

async function toggleNotePrivacy({ note }: { note: Note }) {
  try {
    let isPrivate = note.is_private;
    if (isPrivate) {
      isPrivate = false;
    } else {
      const result = await LocalAuthentication.authenticateAsync({
        disableDeviceFallback: true,
      });
      if (!result.success) {
        throw new Error("Authentication failed");
      }
      isPrivate = true;
    }
    if (isPrivate === note.is_private) {
      return isPrivate;
    }
    await database().ref(`/notes/${note.user!}/${note.id!}`).update({
      is_private: isPrivate,
    });
    return isPrivate;
  } catch (e) {
    return false;
  }
}

export default function useNotePrivacyMutation() {
  return useMutation(toggleNotePrivacy);
}
