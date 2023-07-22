import React from "react";
import { View, ViewStyle } from "react-native";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";

import Row from "components/row";
import { useLayout } from "hooks";
import { globalStyles } from "themes";

interface Props {
  children: [React.ReactNode, React.ReactNode];
  showAction?: boolean;
}

export default function PairedInputButton({ showAction, children }: Props) {
  const [input, action] = children;
  const { onLayout, height } = useLayout();
  return (
    <Animated.View style={$wrapper} layout={Layout.springify().delay(500)}>
      <Row gap={8}>
        <View onLayout={onLayout} style={globalStyles.container}>
          {input}
        </View>
        {showAction ? (
          <Animated.View
            entering={FadeIn.duration(250)}
            exiting={FadeOut.duration(250)}
            style={[
              globalStyles.centered,
              $actionContainer,
              { maxHeight: height },
            ]}
          >
            {action}
          </Animated.View>
        ) : (
          <View />
        )}
      </Row>
    </Animated.View>
  );
}

const $wrapper: ViewStyle = { width: "100%" };
const $actionContainer: ViewStyle = {
  overflow: "hidden",
  borderRadius: 16,
};
