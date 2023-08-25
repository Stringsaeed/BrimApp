import { Check } from "phosphor-react-native";
import React, { useCallback } from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { ListItem, SizableText, YGroup } from "tamagui";

import { useCountryPickerContext } from "contexts";
import { CountryDataType } from "types";

interface CountryPickerItemProps {
  item: CountryDataType;
}

export default function CountryPickerItem({ item }: CountryPickerItemProps) {
  const { sharedValue, onChange } = useCountryPickerContext();

  const handleChange = useCallback(() => {
    onChange(item);
  }, [item, onChange]);

  const style = useAnimatedStyle(() => {
    return {
      opacity: sharedValue.value === item.code ? 1 : 0,
    };
  }, [sharedValue.value, item.code]);

  return (
    <YGroup.Item>
      <ListItem
        icon={({ color, size }) => (
          <SizableText
            numberOfLines={1}
            adjustsFontSizeToFit
            fontSize={size}
            fontWeight="500"
            color={color}
          >
            {item.emoji}
          </SizableText>
        )}
        onPress={handleChange}
        title={`${item.name} (${item.dial_code})`}
        iconAfter={({ color, size }) => (
          <Animated.View style={style}>
            <Check size={size} color={color} />
          </Animated.View>
        )}
      />
    </YGroup.Item>
  );
}
