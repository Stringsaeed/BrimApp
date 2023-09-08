import { Plus, User } from "@tamagui/lucide-icons";
import React from "react";
import { ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import { Button, XStack } from "tamagui";

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
  return (
    <XStack gap="$2" alignItems="center">
      <OtherMenu />
      <Button
        circular
        bg="$backgroundTransparent"
        scaleIcon={1.7}
        onPress={onPressCreate}
        icon={Plus}
      />
      <Button
        circular
        bg="$backgroundTransparent"
        scaleIcon={1.7}
        onPress={onPressProfile}
        icon={User}
      />
    </XStack>
  );
}
