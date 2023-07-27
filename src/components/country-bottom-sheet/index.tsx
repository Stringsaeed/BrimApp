import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import React, { useCallback, useMemo } from "react";
import { ViewStyle } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import BottomSheet from "components/bottom-sheet";
import Divider from "components/divider";
import PressableScale from "components/pressable-scale";
import { Body } from "components/typography";
import { getCallingCode, getFlagEmoji } from "utils";

import { CountryPickerProvider } from "./context";
import countryList, { CountryDataType } from "./data";
import CountryPickerItem from "./item";

interface CountryBottomSheetProps {
  region: string;
  onRegionChange: (region: string) => void;
}

export default function CountryBottomSheet({
  onRegionChange,
  region,
}: CountryBottomSheetProps) {
  const ref = React.useRef<BottomSheetModal>(null);
  const countryCode = useMemo(() => getCallingCode(region), [region]);

  const countryFlag = useMemo(() => getFlagEmoji(region), [region]);

  const handleOnPress = useCallback(() => {
    ref.current?.present();
  }, []);

  const handleOnChange = useCallback(
    (item: string) => {
      onRegionChange(item);
      ref.current?.dismiss();
    },
    [onRegionChange]
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<CountryDataType>) => {
      return <CountryPickerItem item={item} />;
    },
    []
  );

  return (
    <>
      <PressableScale onPress={handleOnPress} style={countryFlagButton}>
        <Body>
          {countryFlag} +{countryCode}
        </Body>
      </PressableScale>
      <BottomSheet ref={ref} snapPoints={["100%"]} title="Select Country">
        <CountryPickerProvider value={region} onChange={handleOnChange}>
          <FlashList
            data={countryList}
            renderItem={renderItem}
            estimatedItemSize={60}
            ItemSeparatorComponent={() => <Divider />}
            renderScrollComponent={ScrollView}
          />
        </CountryPickerProvider>
      </BottomSheet>
    </>
  );
}

const countryFlagButton: ViewStyle = {
  backgroundColor: "#eaeaea",
  justifyContent: "center",
  alignSelf: "flex-start",
  borderColor: "#eaeaea",
  alignItems: "center",
  width: undefined,
  borderRadius: 16,
  flex: undefined,
  height: "auto",
  borderWidth: 1,
  padding: 16,
};
