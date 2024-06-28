import { Check } from "@tamagui/lucide-icons";
import React, { ComponentProps } from "react";
import { ListItem, Square, YGroup } from "tamagui";

interface Props {
  selected: boolean;
  onPress: () => void;
  title: string;
  icon?: ComponentProps<typeof ListItem>["icon"];
}

export default function SelectThemeItem({
  selected,
  onPress,
  title,
  icon,
}: Props) {
  return (
    <YGroup.Item>
      <ListItem
        title={title}
        bg="$backgroundTransparent"
        iconAfter={({ color, size }) => (
          <Square
            animation="lazy"
            scale={selected ? 1 : 0}
            opacity={selected ? 1 : 0}
          >
            <Check color={color} size={size} />
          </Square>
        )}
        icon={icon}
        size="$4.5"
        onPress={onPress}
      />
    </YGroup.Item>
  );
}
