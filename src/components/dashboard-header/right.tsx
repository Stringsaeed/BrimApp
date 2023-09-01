import { Plus, User } from "phosphor-react-native";
import React from "react";
import { ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import { Button, XStack, useTheme } from "tamagui";

import OtherMenu from "./other";

interface DashboardHeaderRightProps {
  onPressCreate: () => void;
  onPressProfile: () => void;
  createAnimatedStyle?: Animated.AnimateStyle<ViewStyle>;
}

export default function DashboardHeaderRight({
  onPressProfile,
  onPressCreate,
}: DashboardHeaderRightProps) {
  const theme = useTheme();
  const text = theme.color.get();
  return (
    <XStack gap="$1" alignItems="center">
      <OtherMenu color={text} />
      <Button
        animation="quick"
        // eslint-disable-next-line react-native/no-inline-styles
        enterStyle={{ opacity: 0, scale: 0.2 }}
        size="$3.5"
        aspectRatio={1}
        borderRadius="$12"
        borderWidth={0}
        bg="$pink6"
        scaleIcon={1.4}
        onPress={onPressCreate}
        icon={({ size }) => <Plus color={text} size={size} weight="bold" />}
      />
      <Button
        animation="quick"
        // eslint-disable-next-line react-native/no-inline-styles
        enterStyle={{ opacity: 0, scale: 0.2 }}
        size="$3.5"
        borderRadius="$12"
        aspectRatio={1}
        borderWidth={0}
        bg="$backgroundTransparent"
        scaleIcon={1.4}
        onPress={onPressProfile}
        icon={({ size }) => <User color={text} size={size} weight="bold" />}
      />
    </XStack>
  );
}
