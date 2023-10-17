import React from "react";

import SearchBar from "components/search-bar";
import { useNotesList } from "contexts";

export default function NoteListSearchBar() {
  const { onSearchValueChange, isSearchBarVisible, searchValue } =
    useNotesList();

  if (!isSearchBarVisible) return null;

  return <SearchBar onChange={onSearchValueChange} value={searchValue} />;
}
