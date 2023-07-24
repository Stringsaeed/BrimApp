import React from "react";
import { StyleProp, ViewStyle } from "react-native";

export type BaseButtonProps = {
  children?: React.ReactNode;
  onPress?: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export type VariantsProps = {
  size?: "Small" | "Medium" | "Large";
  variantStyle?: "Borderless" | "BezeledGray" | "Bezeled" | "Filled";
  iconOnly?: boolean;
};

export type ButtonProps = BaseButtonProps & VariantsProps;
