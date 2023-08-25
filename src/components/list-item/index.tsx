import React from "react";
import { ListItem as TamaguiListItem, YGroup } from "tamagui";

interface ListItemProps {
  title?: string;
  subtitle?: string;
}

export default function ListItem({ subtitle, title }: ListItemProps) {
  return (
    <YGroup.Item>
      <TamaguiListItem
        title={title}
        size="$5"
        subTitle={subtitle}
        accessibilityRole="button"
      />
    </YGroup.Item>
  );
}
