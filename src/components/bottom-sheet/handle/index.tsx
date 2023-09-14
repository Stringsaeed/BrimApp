import {
  BottomSheetHandle,
  BottomSheetHandleProps,
} from "@gorhom/bottom-sheet";
import React from "react";
import { StyleSheet } from "react-native";

export default function Handle({ ...props }: BottomSheetHandleProps) {
  return (
    <BottomSheetHandle
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    borderRadius: 0,
  },
  indicator: {
    borderRadius: 7,
    width: "70%",
    height: 12,
  },
});
