import { Plus, Settings } from "@tamagui/lucide-icons";
import React from "react";
import { XGroup } from "tamagui";

import PressableScale from "components/pressable-scale";

import OtherMenu from "./other";

interface DashboardHeaderRightProps {
  onPressCreate: () => void;
  onPressProfile: () => void;
}

export default function DashboardHeaderRight({
  onPressProfile,
  onPressCreate,
}: DashboardHeaderRightProps) {
  return (
    <XGroup gap="$2" alignItems="center">
      <XGroup.Item>
        <OtherMenu />
      </XGroup.Item>
      <XGroup.Item>
        <PressableScale activeScale={0.9} onPress={onPressCreate}>
          <Plus />
        </PressableScale>
      </XGroup.Item>
      <XGroup.Item>
        <PressableScale activeScale={0.9} onPress={onPressProfile}>
          <Settings />
        </PressableScale>
      </XGroup.Item>
    </XGroup>
  );
}
