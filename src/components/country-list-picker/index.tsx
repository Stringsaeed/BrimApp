import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import React, { useCallback, useMemo, useState } from "react";
import { View, YStack } from "tamagui";

import CountryPickerItem from "@/components/country-picker-item";
import { CountryPickerProvider } from "@/contexts";
import { CountryDataType } from "@/types";

import countryList from "./data";
import CountryListPickerHeader from "./header";

interface CountryListPickerProps {
  region: string;
  onRegionChange: (region: string) => void;
  onClose?: () => void;
}

export default function CountryListPicker({
  onRegionChange,
  onClose,
  region,
}: CountryListPickerProps) {
  const [search, setSearch] = useState("");
  const data = useMemo(() => {
    if (!search) return countryList;
    const lowerCaseSearch = search.toLowerCase();
    return countryList.filter((item) => {
      return (
        item.name.toLowerCase().includes(lowerCaseSearch) ||
        item.code.toLowerCase().includes(lowerCaseSearch) ||
        item.dial_code.toLowerCase().includes(lowerCaseSearch) ||
        item.emoji.toLowerCase().includes(lowerCaseSearch)
      );
    });
  }, [search]);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<CountryDataType>) => {
      return <CountryPickerItem item={item} />;
    },
    []
  );

  return (
    <CountryPickerProvider value={region} onChange={onRegionChange}>
      <YStack flex={1} bg="$background">
        <CountryListPickerHeader
          close={onClose}
          onSearchSubmit={(value) => setSearch(value)}
        />
        <View flex={1}>
          <FlashList
            data={data}
            renderItem={renderItem}
            estimatedItemSize={60}
          />
        </View>
      </YStack>
    </CountryPickerProvider>
  );
}
