import {
  HeaderBackButton,
  HeaderBackButtonProps,
} from "@react-navigation/elements";
import { ChevronLeft } from "@tamagui/lucide-icons";
import React from "react";

export default function BackButton({
  canGoBack,
  ...props
}: HeaderBackButtonProps) {
  if (!canGoBack) {
    return null;
  }
  return (
    <HeaderBackButton
      {...props}
      labelVisible={false}
      backImage={() => <ChevronLeft size="$2" color="$accent" />}
    />
  );
}
