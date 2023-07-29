import { Stack } from "expo-router";
import React from "react";

import DashboardHeaderRight from "./right";

interface Props {
  onPressCreate: () => void;
  onPressProfile: () => void;
}

export default function DashboardHeader({
  onPressProfile,
  onPressCreate,
}: Props) {
  function renderHeaderRight() {
    return (
      <DashboardHeaderRight
        onPressProfile={onPressProfile}
        onPressCreate={onPressCreate}
      />
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: renderHeaderRight,
          headerBlurEffect: "light",
          headerTransparent: true,
          headerShown: true,
          title: "",
        }}
      />
    </>
  );
}
