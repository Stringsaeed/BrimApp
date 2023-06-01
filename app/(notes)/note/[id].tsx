import { usePathname } from "expo-router";
import React, { useCallback } from "react";
import { Input, Stack } from "tamagui";
import database from "@react-native-firebase/database";

import { useAuth } from "contexts";
import { Note } from "types";

export default function NotePage() {
  const pathname = usePathname();
  const { user } = useAuth();

  const [note, setNote] = React.useState<Note>();

  const getNote = useCallback(async () => {
    const noteId = pathname.split("/")[2];

    const snapshot = await database()
      .ref(`/notes/${user?.uid}/${noteId}`)
      .once("value");

    const snapshotValue = snapshot.val();
    console.log(snapshot.toJSON());

    const note = {
      ...snapshotValue,
      id: snapshot.key,
      user: user?.uid,
    };

    setNote(note);
  }, [pathname, user?.uid]);

  React.useEffect(() => {
    getNote();
  }, [getNote]);

  if (!note) {
    return null;
  }

  return (
    <Stack flex={1} paddingHorizontal="$4">
      <Input
        multiline
        defaultValue={note.note}
        value={note.note}
        onChangeText={(text) => {
          setNote({
            ...note,
            note: text,
          });
        }}
        style={{ flex: 1, width: "100%", height: "100%", textAlign: "left" }}
      />
    </Stack>
  );
}
