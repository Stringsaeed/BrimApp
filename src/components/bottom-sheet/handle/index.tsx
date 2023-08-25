import {
  BottomSheetHandle,
  BottomSheetHandleProps,
} from "@gorhom/bottom-sheet";
import React from "react";
import { StyleSheet } from "react-native";
import { H6, useTheme } from "tamagui";

export default function Handle({
  title,
  ...props
}: BottomSheetHandleProps & { title?: string }) {
  const theme = useTheme();
  const foregroundColor = theme.color.get();
  return (
    <BottomSheetHandle
      {...props}
      indicatorStyle={styles.indicator}
      style={[styles.container, { borderBottomColor: foregroundColor }]}
    >
      <H6 textAlign="center" fontStyle="italic">
        {title}
      </H6>
    </BottomSheetHandle>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopStartRadius: 200,
    paddingBottom: 16,
    paddingTop: 12,
  },
  indicator: {
    display: "none",
  },
});
