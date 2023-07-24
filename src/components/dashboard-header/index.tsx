import { Stack } from "expo-router";
import { View } from "moti";
import React from "react";
import { StyleSheet } from "react-native";
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { Title3 } from "components/typography";
import { theme } from "themes";

import DashboardHeaderRight from "./right";

interface Props {
  onPressCreate: () => void;
  onPressProfile: () => void;
}

export default function DashboardHeader({
  onPressProfile,
  onPressCreate,
}: Props) {
  const { top } = useSafeAreaInsets();
  const { width } = useSafeAreaFrame();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View
        from={{ transform: [{ translateY: -56 }] }}
        animate={{ transform: [{ translateY: 0 }] }}
        style={[styles.container, { paddingTop: top + 8, width }]}
      >
        <Title3>Notes</Title3>
        <DashboardHeaderRight
          onPressProfile={onPressProfile}
          onPressCreate={onPressCreate}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    shadowOffset: { height: 2, width: 0 },
    shadowColor: theme.colors.shadow,
    justifyContent: "space-between",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 8,
    shadowRadius: 5,
    zIndex: 10,
  },
});
