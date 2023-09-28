import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { Platform } from "react-native";
import { SearchBarProps } from "react-native-screens";

import { DashboardHeader, NotesList, ScreenContainer } from "components";
import { NotesListProvider, useNotesContext } from "contexts";
import {
  useCreateEmptyNoteMutation,
  useNavigateNote,
  useNavigateProfile,
} from "hooks";
import { RootStackScreenProps } from "routers";

export default function DashboardScreen() {
  const [searchText, setSearchText] = React.useState("");
  const { notes } = useNotesContext();
  const filteredNotes = notes
    .filter((note) => ![note.is_archived, note.is_trashed].some((x) => x))
    .filter(
      (note) =>
        note.title?.toLowerCase()?.includes(searchText.toLowerCase()) ||
        note.note?.toLowerCase()?.includes(searchText.toLowerCase())
    );

  const createEmptyNoteMutation = useCreateEmptyNoteMutation();
  const onNavigateNote = useNavigateNote();
  const onPressProfile = useNavigateProfile();
  const navigation =
    useNavigation<RootStackScreenProps<"Dashboard">["navigation"]>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: Platform.select<SearchBarProps | undefined>({
        ios: {
          onChangeText: (event) => {
            setSearchText(event.nativeEvent.text);
          },
        },
        default: undefined,
      }),
    });
  }, [navigation]);

  return (
    <NotesListProvider notes={filteredNotes}>
      <DashboardHeader
        onPressCreate={createEmptyNoteMutation.mutate}
        onPressProfile={onPressProfile}
      />
      <ScreenContainer withoutBeautifulPadding handleHeaderHeight type="fixed">
        <NotesList onPressNote={onNavigateNote} />
      </ScreenContainer>
    </NotesListProvider>
  );
}
