import { Stack } from "expo-router";
import React from "react";

import DashboardHeaderRight from "./right";
import Tag from "components/tag";

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

  return (
    <Stack.Screen
      options={{
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
