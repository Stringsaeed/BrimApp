import { Stack } from "expo-router";
import React, { useCallback } from "react";

import DashboardHeaderRight from "./right";

interface Props {
  onPressCreate: () => void;
  onPressProfile: () => void;
}

export default function DashboardHeader({
  onPressProfile,
  onPressCreate,
}: Props) {
  const headerRight = useCallback(() => {
    return (
      <DashboardHeaderRight
        onPressProfile={onPressProfile}
        onPressCreate={onPressCreate}
      />
    );
  }, [onPressCreate, onPressProfile]);

  return <Stack.Screen options={{ headerRight }} />;
}
