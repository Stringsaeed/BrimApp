/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable import/no-extraneous-dependencies */
import {
  SizeVariantSpreadFunction,
  getVariableValue,
  isWeb,
} from "@tamagui/core";
import { getButtonSized } from "@tamagui/get-button-sized";
import { getFontSized } from "@tamagui/get-font-sized";
import { getSpace } from "@tamagui/get-token";

export const inputSizeVariant: SizeVariantSpreadFunction<any> = (
  val = "$true",
  extras
) => {
  if (extras.props.multiline || extras.props.numberOfLines > 1) {
    return textAreaSizeVariant(val, extras);
  }
  const buttonStyles = getButtonSized(val, extras);
  const paddingHorizontal = getSpace(val, {
    bounds: [2],
    shift: -1,
  });
  const fontStyle = getFontSized(val as any, extras);
  // lineHeight messes up input on native
  if (!isWeb && fontStyle) {
    delete fontStyle["lineHeight"];
  }
  return {
    ...fontStyle,
    ...buttonStyles,
    paddingHorizontal,
  };
};

const textAreaSizeVariant: SizeVariantSpreadFunction<any> = (
  val = "$true",
  extras
) => {
  const { props } = extras;
  const buttonStyles = getButtonSized(val, extras);
  const fontStyle = getFontSized(val as any, extras)!;
  const lines = props.rows ?? props.numberOfLines;
  const height =
    typeof lines === "number"
      ? lines * getVariableValue(fontStyle.lineHeight)
      : "auto";
  const paddingVertical = getSpace(val, {
    bounds: [2],
    shift: -2,
  });
  const paddingHorizontal = getSpace(val, {
    bounds: [2],
    shift: -1,
  });
  return {
    ...buttonStyles,
    ...fontStyle,
    paddingHorizontal,
    paddingVertical,
    height,
  };
};
