import { Plus, User } from "phosphor-react-native";
import React from "react";
import { Pressable, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import { Button, useTheme } from "tamagui";

import Row from "components/row";

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
    <Row gap={8} center>
      <OtherMenu />
      <Button
        animation="quick"
        // eslint-disable-next-line react-native/no-inline-styles
        enterStyle={{ opacity: 0, scale: 0.2 }}
        size="$2"
        aspectRatio={1}
        borderRadius="$12"
        borderWidth={0}
        bg="$pink6"
        onPress={onPressCreate}
        icon={({ size }) => <Plus color={text} size={size} weight="bold" />}
      />
      <Pressable accessibilityRole="button" onPress={onPressProfile}>
        <User color={text} />
      </Pressable>
    </Row>
  );
}
