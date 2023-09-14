import { X } from "@tamagui/lucide-icons";
import React from "react";
import { Card, XStack, Square, View, H4 } from "tamagui";

interface BannerProps {
  children: NonNullable<React.ReactNode>;
  isVisible?: boolean;
  onClose?: () => void;
  label?: string;
}

export default function Banner({
  isVisible,
  children,
  onClose,
  label,
}: BannerProps) {
  if (!isVisible) return <></>;

  return (
    <Card elevate animation="lazy" enterStyle={{ opacity: 0 }}>
      <Card.Header padded>
        <XStack justifyContent="space-between" alignItems="center">
          <H4>{label}</H4>
          <Square onPress={onClose}>
            <X />
          </Square>
        </XStack>
      </Card.Header>
      <View p="$4">{children}</View>
    </Card>
  );
}
