import { Check } from "@tamagui/lucide-icons";
import React from "react";
import { ListItem, Square, YGroup } from "tamagui";

interface Props {
  selected: boolean;
  onPress: () => void;
  title: string;
}

export default function SelectThemeItem({ selected, onPress, title }: Props) {
  return (
    <YGroup.Item>
      <ListItem
        title={title}
        iconAfter={({ color, size }) => (
          <Square animation="quick" opacity={selected ? 1 : 0}>
            <Check color={color} size={size} />
          </Square>
        )}
        onPress={onPress}
      />
    </YGroup.Item>
  );
}
