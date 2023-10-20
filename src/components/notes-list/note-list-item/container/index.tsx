import React from "react";
import {
  ComposedGesture,
  GestureDetector,
  GestureType,
} from "react-native-gesture-handler";
import Swipeable, {
  SwipeableProps,
} from "react-native-gesture-handler/Swipeable";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

type NoteListItemContainerProps = {
  children: NonNullable<React.ReactNode>;
  gesture: ComposedGesture | GestureType;
  onSwipeableWillOpen: SwipeableProps["onSwipeableWillOpen"];
  renderLeftActions: SwipeableProps["renderLeftActions"];
  renderRightActions: SwipeableProps["renderRightActions"];
  enabled: boolean;
};

export default function NoteListItemContainer({
  onSwipeableWillOpen,
  renderRightActions,
  renderLeftActions,
  enabled = true,
  children,
  gesture,
}: NoteListItemContainerProps) {
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View exiting={FadeOut} entering={FadeIn}>
        <Swipeable
          enabled={enabled}
          onSwipeableWillOpen={onSwipeableWillOpen}
          renderRightActions={renderRightActions}
          renderLeftActions={renderLeftActions}
        >
          {children}
        </Swipeable>
      </Animated.View>
    </GestureDetector>
  );
}
