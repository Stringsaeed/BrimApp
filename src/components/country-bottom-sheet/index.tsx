import React, { useCallback, useMemo, useState } from "react";
import { Modal, Platform, ViewStyle } from "react-native";

import CountryListPicker from "components/country-list-picker";
import PressableScale from "components/pressable-scale";
import { Body } from "components/typography";
import { getCallingCode, getFlagEmoji } from "utils";

interface CountryBottomSheetProps {
  region: string;
  onRegionChange: (region: string) => void;
}

export default function CountryBottomSheet({
  onRegionChange,
  region,
}: CountryBottomSheetProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const countryCode = useMemo(() => getCallingCode(region), [region]);
  const countryFlag = useMemo(() => getFlagEmoji(region), [region]);

  const handleOnPress = useCallback(() => {
    setModalVisible(true);
  }, []);

  const handleOnChange = useCallback(
    (item: string) => {
      onRegionChange(item);
      setModalVisible(false);
    },
    [onRegionChange]
  );

  return (
    <>
      <PressableScale onPress={handleOnPress} style={countryFlagButton}>
        <Body>
          {countryFlag} +{countryCode}
        </Body>
      </PressableScale>
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="slide"
        transparent={Platform.OS === "web"}
        statusBarTranslucent={Platform.OS === "web"}
      >
        <CountryListPicker
          onClose={() => setModalVisible(false)}
          region={region}
          onRegionChange={handleOnChange}
        />
      </Modal>
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
  borderWidth: 1,
  padding: 16,
  height: 56,
};
