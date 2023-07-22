import React from "react";
import { View, ViewStyle } from "react-native";

export default function Spacer() {
  return <View style={$container} />;
}

const $container: ViewStyle = {
  flex: 1,
};
