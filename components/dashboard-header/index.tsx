import { Stack } from "expo-router";
import React from "react";
import { View, StyleSheet, Platform } from "react-native";

import BlurView from "components/blur-view";
import Tag from "components/tag";

import DashboardHeaderRight from "./right";

interface Props {
  onPressCreate: () => void;
  onPressProfile: () => void;
}

export default function DashboardHeader({
  onPressProfile,
  onPressCreate,
}: Props) {
  const headerRight = () => {
    return (
      <DashboardHeaderRight
        {...{
          onPressProfile,
          onPressCreate,
        }}
      />
    );
  };

  const headerLeft = () => {
    return <Tag>Beta</Tag>;
  };

  const headerBackground = () => {
    return (
      <View style={styles.headerContainer}>
        <BlurView
          autoUpdate
          blurAmount={10}
          blurType="light"
          style={StyleSheet.absoluteFill}
        />
      </View>
    );
  };

  return (
    <Stack.Screen
      options={{
        headerBackground: Platform.OS !== "ios" ? headerBackground : undefined,
        headerBlurEffect: "light",
        headerTransparent: true,
        headerShown: true,
        headerRight,
        headerLeft,
        title: "",
      }}
    />
  );
}

const styles = StyleSheet.create({
  headerContainer: { flex: 1 },
});
