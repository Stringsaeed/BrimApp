import {
  BottomSheetHandle,
  BottomSheetHandleProps,
} from "@gorhom/bottom-sheet";
import React from "react";
import { StyleSheet } from "react-native";

import { Subheadline } from "components/typography";
import { theme } from "themes";

export default function Handle({
  title,
  ...props
}: BottomSheetHandleProps & { title?: string }) {
  return (
    <BottomSheetHandle
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.container}
    >
      <Subheadline align="center" emphasized>
        {title}
      </Subheadline>
    </BottomSheetHandle>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.text,
    borderTopStartRadius: 200,
    paddingBottom: 16,
    paddingTop: 12,
  },
  indicator: {
    display: "none",
  },
});
