import { Plus, User } from "@tamagui/lucide-icons";
import React from "react";
import { ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import { XGroup } from "tamagui";

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
    <XGroup gap="$2" alignItems="center">
      <XGroup.Item>
        <OtherMenu />
      </XGroup.Item>
      <XGroup.Item>
        <Plus onPress={onPressCreate} />
      </XGroup.Item>
      <XGroup.Item>
        <User onPress={onPressProfile} />
      </XGroup.Item>
    </XGroup>
  );
}
