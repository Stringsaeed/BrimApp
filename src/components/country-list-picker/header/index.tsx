import { ArrowLeft, X, MagnifyingGlass } from "phosphor-react-native";
import React, { useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, XStack, Input, View } from "tamagui";

type Props = {
  title?: string;
  close?: () => void;
  onSearchSubmit: (search: string) => void;
  twCenter?: string;
};

export default function CountryListPickerHeader({
  onSearchSubmit,
  close,
}: Props) {
  const { top } = useSafeAreaInsets();
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
  useEffect(() => {
    if (!showSearch) {
      onSearchSubmit("");
    }
  }, [showSearch, onSearchSubmit]);

  return (
    <XStack mt={top} px="$4" gap="$2" alignItems="center">
      <Button
        onPress={close}
        accessibilityRole="button"
        size="$4"
        aspectRatio={1}
        borderRadius="$12"
        scaleIcon={1.3}
        icon={({ color, size }) => <ArrowLeft size={size} color={color} />}
      />
      <View flex={1}>
        {!!showSearch && (
          <Input
            accessibilityLabel="Text input field"
            fontWeight="500"
            fontSize="$4"
            placeholder="Search"
            autoFocus
            autoComplete="country"
            textContentType="countryName"
            onChangeText={handleSearch}
          />
        )}
      </View>
      <Button
        onPress={() => setShowSearch(!showSearch)}
        accessibilityRole="button"
        size="$4"
        aspectRatio={1}
        borderRadius="$12"
        scaleIcon={1.3}
        icon={({ color, size }) =>
          showSearch ? (
            <X size={size} color={color} />
          ) : (
            <MagnifyingGlass size={size} color={color} />
          )
        }
      />
    </XStack>
  );
}
