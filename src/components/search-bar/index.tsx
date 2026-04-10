import { Search } from "@tamagui/lucide-icons";
import React, { Ref } from "react";
import { useTranslation } from "react-i18next";
import { TextInput } from "react-native";
import { Input, InputProps, XStack } from "tamagui";

function SearchBar({
  ref,
  ...props
}: InputProps & { ref?: Ref<TextInput> | null }) {
  const { t } = useTranslation();
  return (
    <XStack
      px="$4"
      borderRadius="$12"
      backgroundColor="$gray3"
      ai="center"
      height={36}
      f={1}
    >
      <Search size="$size.1" color="$gray9" />
      <Input
        ref={ref}
        flex={1}
        borderWidth={0}
        backgroundColor="$gray3"
        placeholder={t("searchNotes")}
        placeholderTextColor="$gray9"
        size="$3"
        {...props}
      />
    </XStack>
  );
}

export default SearchBar;
