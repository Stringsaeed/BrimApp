import React from "react";

import SearchBar from "components/search-bar";
import { useNotesList } from "contexts";

export default function NoteListSearchBar() {
  const {
    onSearchValueChange,
    isSearchBarVisible,
    multiSelectMode,
    searchValue,
  } = useNotesList();

  if (!isSearchBarVisible) return null;

  return (
    <SearchBar
      disabled={multiSelectMode}
      onChange={onSearchValueChange}
      value={searchValue}
    />
  );
}
