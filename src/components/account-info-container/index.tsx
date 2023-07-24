import React, { PropsWithChildren } from "react";

import AnimatedKeyboardView from "components/animated-keyboard-view";
import { combineStyles } from "themes";

const styles = combineStyles(
  "container",
  "keyboardContainer",
  "baseScreen",
  "background",
  "gap"
);

export default function AccountInfoContainer({ children }: PropsWithChildren) {
  return <AnimatedKeyboardView style={styles}>{children}</AnimatedKeyboardView>;
}
