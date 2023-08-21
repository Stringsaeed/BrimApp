import { Text, TextInput, View } from "dripsy";
import { ArrowLeft, X, MagnifyingGlass } from "phosphor-react-native";
import React, { useEffect, useRef, useState } from "react";
import { useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Button from "components/button";
import { theme } from "themes";

type Props = {
  title?: string;
  close?: () => void;
  onSearchSubmit: (search: string) => void;
  twCenter?: string;
};

export default function CountryListPickerHeader({
  onSearchSubmit,
  close,
  title,
}: Props) {
  const { top } = useSafeAreaInsets();
  const isDark = useColorScheme() === "dark";
  const [showSearch, setShowSearch] = useState(true);
  const searchDebounceTimeout = useRef<any>(null);

  const handleSearch = (text: string) => {
    if (searchDebounceTimeout.current) {
      clearTimeout(searchDebounceTimeout.current);
    }
    searchDebounceTimeout.current = setTimeout(() => {
      onSearchSubmit(text);
    }, 40);
  };
  const onPressTitle = () => {
    setShowSearch(true);
  };
  useEffect(() => {
    if (!showSearch) {
      onSearchSubmit("");
    }
  }, [showSearch, onSearchSubmit]);

  return (
    <View variant="layout.header" sx={{ marginTop: top }}>
      <View variant="layout.header.side">
        <Button
          onPress={close}
          variantStyle="Borderless"
          size="Medium"
          iconOnly
          style={{
            backgroundColor: theme.colors.light,
            height: 48,
            width: 48,
          }}
        >
          <ArrowLeft size={24} color={isDark ? "#FFF" : "#000"} />
        </Button>
      </View>

      <View variant="layout.flex">
        {showSearch ? (
          <TextInput
            accessibilityLabel="Text input field"
            sx={{ fontWeight: "500", fontSize: "$3" }}
            placeholder="Search"
            autoFocus
            autoComplete="country"
            textContentType="countryName"
            onChangeText={handleSearch}
          />
        ) : (
          <Text
            onPress={onPressTitle}
            sx={{
              fontWeight: "bold",
              fontSize: "$3",
              px: "$4",
              py: "$3",
            }}
          >
            {title}
          </Text>
        )}
      </View>
      <View variant="layout.header.side">
        <Button
          onPress={() => setShowSearch(!showSearch)}
          variantStyle="Borderless"
          size="Medium"
          iconOnly
        >
          {showSearch ? (
            <X size={24} color={isDark ? "#FFF" : "#000"} />
          ) : (
            <MagnifyingGlass size={24} color={isDark ? "#FFF" : "#000"} />
          )}
        </Button>
      </View>
    </View>
  );
}
