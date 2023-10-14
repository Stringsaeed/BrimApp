import { Search } from "@tamagui/lucide-icons";
import React from "react";
import { Input, XStack } from "tamagui";

import { useNotesList } from "contexts";

export default function NoteListSearchBar() {
  const { onSearchValueChange, isSearchBarVisible, searchValue } =
    useNotesList();

  if (!isSearchBarVisible) return null;

  return (
    <XStack
      px="$4"
      borderRadius="$12"
      mx="$4"
      mb="$4"
      backgroundColor="$gray3"
      ai="center"
    >
      <Search size="$size.1" />
      <Input
        flex={1}
        borderWidth={0}
        backgroundColor="$gray3"
        onChange={onSearchValueChange}
        value={searchValue}
        placeholder="Search notes"
        size="$3"
      />
    </XStack>
  );
}
