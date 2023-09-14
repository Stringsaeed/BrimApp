import React from "react";
import { StyleSheet } from "react-native";
import { View } from "tamagui";

export default function Divider() {
  return (
    <View
      borderBottomColor="$accent"
      borderBottomWidth={StyleSheet.hairlineWidth}
      alignSelf="stretch"
    />
  );
}
