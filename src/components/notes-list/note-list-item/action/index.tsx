import React from "react";
import { Pressable } from "react-native";
import Animated from "react-native-reanimated";
import { View, styled } from "tamagui";

interface Props {
  variant: "left" | "right";
  onPress: () => void;
  children: React.ReactNode;
  bg?: React.ComponentProps<typeof View>["bg"];
}

const AnimatedView = Animated.createAnimatedComponent(View);

const ActionButton = styled(Pressable, {
  variants: {
    action: {
      left: {
        alignItems: "flex-start",
      },
      right: {
        alignItems: "flex-end",
      },
    },
  } as const,
  paddingHorizontal: "$3.5",
  justifyContent: "center",
  flexGrow: 1,
});

export default function NoteListItemAction({
  variant = "right",
  children,
  onPress,
  bg,
}: Props) {
  return (
    <AnimatedView bg={bg} flex={1} ov="hidden">
      <ActionButton action={variant} onPress={onPress}>
        {children}
      </ActionButton>
    </AnimatedView>
  );
}
