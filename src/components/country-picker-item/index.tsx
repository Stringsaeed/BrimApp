import { Text, useSx } from "dripsy";
import { Check } from "phosphor-react-native";
import React, { useCallback } from "react";
import { View, useColorScheme } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import PressableScale from "components/pressable-scale";
import Row from "components/row";
import { useCountryPickerContext } from "contexts";
import { CountryDataType } from "types";

interface CountryPickerItemProps {
  item: CountryDataType;
}

export default function CountryPickerItem({ item }: CountryPickerItemProps) {
  const isDark = useColorScheme() === "dark";
  const { sharedValue, onChange } = useCountryPickerContext();
  const sx = useSx();

  const handleChange = useCallback(() => {
    onChange(item);
  }, [item, onChange]);

  const style = useAnimatedStyle(() => {
    return {
      opacity: sharedValue.value === item.code ? 1 : 0,
    };
  }, [sharedValue.value, item.code]);

  return (
    <PressableScale onPress={handleChange}>
      <Row center spaceBetween style={sx({ paddingX: "$3", paddingY: "$2" })}>
        <View style={sx({ variant: "layout.flex" })}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            sx={{ fontWeight: "500", fontSize: "$2" }}
          >
            {item.emoji} {item.name} ({item.dial_code})
          </Text>
        </View>
        <Animated.View style={style}>
          <Check size={24} color={isDark ? "#FFF" : "#000"} />
        </Animated.View>
      </Row>
    </PressableScale>
  );
}
