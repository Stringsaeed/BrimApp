import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import {
  NativeSyntheticEvent,
  Platform,
  TextInputFocusEventData,
} from "react-native";
import { SearchBarProps } from "react-native-screens";
import { Input } from "tamagui";

import { DashboardHeader, NotesList, ScreenContainer } from "components";
import { NotesListProvider, useNotesContext } from "contexts";
import {
  useCreateEmptyNoteMutation,
  useNavigateNote,
  useNavigateProfile,
} from "hooks";
import { RootStackScreenProps, Routes } from "routers";

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
    useNavigation<RootStackScreenProps<Routes.Dashboard>["navigation"]>();

  const handleTextChange = (
    event: NativeSyntheticEvent<TextInputFocusEventData>
  ) => {
    setSearchText(event.nativeEvent.text);
  };

  useLayoutEffect(() => {
    if (Platform.OS === "android") return;
    navigation.setOptions({
      headerSearchBarOptions: Platform.select<SearchBarProps | undefined>({
        ios: {
          onChangeText: handleTextChange,
        },
        default: undefined,
      }),
    });
  }, []);

  return (
    <NotesListProvider notes={filteredNotes}>
      <DashboardHeader
        onPressCreate={createEmptyNoteMutation.mutate}
        onPressProfile={onPressProfile}
      />
      <ScreenContainer withoutBeautifulPadding handleHeaderHeight type="fixed">
        {Platform.OS !== "ios" && (
          <Input
            backgroundColor="$gray1"
            mx="$4"
            mb="$4"
            onChange={handleTextChange}
            value={searchText}
            placeholder="Search notes"
            size="$3"
            px="$4"
          />
        )}
        <NotesList onPressNote={onNavigateNote} />
      </ScreenContainer>
    </NotesListProvider>
  );
}
