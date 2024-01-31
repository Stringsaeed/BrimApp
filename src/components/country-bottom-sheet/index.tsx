import React, { ComponentProps, useCallback, useMemo, useState } from "react";
import { Modal, Platform, StyleSheet, Image } from "react-native";
import { Button, Circle } from "tamagui";

import CountryListPicker from "components/country-list-picker";
import { getCallingCode } from "utils";

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
  // const countryFlag = useMemo(() => getFlagEmoji(region), [region]);

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
      <Button
        size="$5"
        bg="$backgroundTransparent"
        borderWidth={1}
        borderColor="$gray5"
        onPress={handleOnPress}
        scaleIcon={1.4}
        borderRadius="$12"
        icon={
          (({ color, size }: { color: string; size: number }) => (
            <Circle size={size} overflow="hidden" bg={color}>
              <Image
                accessible={Platform.OS !== "web"}
                tintColor={color}
                accessibilityIgnoresInvertColors
                style={StyleSheet.absoluteFill}
                source={{
                  uri: `https://flagcdn.com/w40/${region.toLowerCase()}.png`,
                }}
              />
            </Circle>
          )) as ComponentProps<typeof Button>["icon"]
        }
      >
        <Button.Text>+{countryCode}</Button.Text>
      </Button>
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="slide"
        transparent={Platform.OS === "web"}
        statusBarTranslucent={Platform.OS === "web"}
        onDismiss={() => setModalVisible(false)}
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
