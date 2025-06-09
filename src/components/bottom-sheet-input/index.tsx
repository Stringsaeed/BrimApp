/* eslint-disable import/no-extraneous-dependencies */
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import {
  ColorStyleProp,
  GetProps,
  isWeb,
  styled,
  useTheme,
} from "@tamagui/core";
import { useFocusable } from "@tamagui/focusable";
import React from "react";

import { inputSizeVariant } from "./helpers";

const defaultStyles = {
  fontFamily: "$body",
  color: "$color",
  outlineWidth: 0,
  borderWidth: 1,
  size: "$true",
  ...(isWeb
    ? {
        tabIndex: 0,
      }
    : {
        focusable: true,
      }),
  focusStyle: {
    outlineColor: "$borderColorFocus",
    borderColor: "$borderColorFocus",
    outlineStyle: "solid",
    outlineWidth: 2,
  },
  hoverStyle: {
    borderColor: "$borderColorHover",
  },
  backgroundColor: "$background",
  borderColor: "$borderColor",
  // this fixes a flex bug where it overflows container
  minWidth: 0,
} as const;

const InputFrame = styled(BottomSheetTextInput, {
  variants: {
    size: {
      "...size": inputSizeVariant,
    },

    unstyled: {
      false: defaultStyles,
    },
  } as const,

  defaultVariants: {
    unstyled: process.env.TAMAGUI_HEADLESS === "1" ? true : false,
  },

  name: "Input",
});

type InputProps = Omit<GetProps<typeof InputFrame>, "placeholderTextColor"> & {
  placeholderTextColor?: ColorStyleProp;
  rows?: number;
};

const Input = InputFrame.styleable<InputProps>(
  // @ts-expect-error --- to be fixed
  (propsIn: InputProps, ref: any) => {
    const props = useInputProps(propsIn, ref);
    return <InputFrame {...props} />;
  }
);

export function useInputProps(props: InputProps, ref: any) {
  const theme = useTheme();
  const { ref: combinedRef, onChangeText } = useFocusable({
    isInput: true,
    props,
    ref,
  });

  const placeholderColorProp = props.placeholderTextColor;
  const placeholderTextColor =
    // @ts-expect-error placeholderColor is not in the type
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    (placeholderColorProp && theme?.[placeholderColorProp]?.get?.()) ??
    placeholderColorProp ??
    theme.placeholderColor?.get();

  return {
    editable: !props.disabled,
    ref: combinedRef,
    ...props,
    placeholderTextColor,
    onChangeText,
  };
}

export default Input;
