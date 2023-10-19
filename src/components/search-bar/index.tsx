import { Search } from "@tamagui/lucide-icons";
import React, { ForwardedRef } from "react";
import { TextInput } from "react-native";
import { Input, InputProps, XStack } from "tamagui";

function SearchBarComponent(
  props: InputProps,
  ref?: ForwardedRef<TextInput | null>
) {
  return (
    <XStack
      px="$4"
      borderRadius="$12"
      m="$4"
      backgroundColor="$gray3"
      ai="center"
    >
      <Search size="$size.1" />
      <Input
        ref={ref}
        flex={1}
        borderWidth={0}
        backgroundColor="$gray3"
        placeholder="Search notes"
        size="$3"
        {...props}
      />
    </XStack>
  );
}

const SearchBar = React.forwardRef(SearchBarComponent);
export default SearchBar;
