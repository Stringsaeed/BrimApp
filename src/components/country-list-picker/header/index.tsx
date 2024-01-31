import { Search, X, ArrowLeft } from "@tamagui/lucide-icons";
import React, { ComponentProps, useEffect, useRef, useState } from "react";
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
    <XStack mt={top} pb="$2" px="$4" gap="$2" alignItems="center">
      <Button
        onPress={close}
        accessibilityRole="button"
        size="$4"
        aspectRatio={1}
        borderRadius="$12"
        scaleIcon={1.3}
        icon={
          (({ color, size }: { color: string; size: number }) => (
            <ArrowLeft size={size} color={color} />
          )) as ComponentProps<typeof Button>["icon"]
        }
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
            borderRadius="$12"
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
        icon={
          (({ color, size }: { color: string; size: number }) =>
            showSearch ? (
              <X size={size} color={color} />
            ) : (
              <Search size={size} color={color} />
            )) as ComponentProps<typeof Button>["icon"]
        }
      />
    </XStack>
  );
}
