import React from "react";
import { StyleSheet } from "react-native";
import { View } from "tamagui";

import { useUserAccent } from "hooks";

export default function Divider() {
  const { accent } = useUserAccent();
  return (
    <View
      borderBottomColor={`$${accent}`}
      borderBottomWidth={StyleSheet.hairlineWidth}
      alignSelf="stretch"
    />
  );
}
