import {
  HeaderBackButton,
  HeaderBackButtonProps,
} from "@react-navigation/elements";
import { ChevronLeft } from "@tamagui/lucide-icons";
import React from "react";

export default function BackButton({ ...props }: HeaderBackButtonProps) {
  return (
    <HeaderBackButton
      {...props}
      backImage={() => <ChevronLeft size="$2" color="$accent" />}
    />
  );
}
