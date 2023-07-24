import { ViewStyle } from "react-native";

import { theme } from "themes";
import { textVariants } from "themes/typography";

import { VariantsProps } from "./types";

const baseStyle: ViewStyle = {
  justifyContent: "center",
  flexDirection: "row",
  alignItems: "center",
};

const small = {
  container: {
    borderRadius: 40,
    height: 28,
    gap: 3,
  },
  text: textVariants.Subheadline,
};

const medium = {
  container: {
    borderRadius: 40,
    height: 34,
    gap: 4,
  },
  text: textVariants.Subheadline,
};

const large = {
  container: {
    borderRadius: 12,
    height: 50,
    gap: 4,
  },
  text: textVariants.Body,
};

const bySize = {
  Medium: medium,
  Large: large,
  Small: small,
};

// style

const borderless = {
  container: {
    backgroundColor: "transparent",
  },
  text: {
    color: theme.colors.dark,
  },
};

const bezeledGray = {
  container: {
    backgroundColor: "#7676801F",
  },
  text: {
    color: theme.colors.dark,
  },
};

const bezeled = {
  container: {
    backgroundColor: "#FFFFFF1F",
  },
  text: {
    color: theme.colors.dark,
  },
};

const filled = {
  container: {
    backgroundColor: theme.colors.primary,
  },
  text: {
    color: theme.colors.light,
  },
};

const byStyle = {
  BezeledGray: bezeledGray,
  Borderless: borderless,
  Bezeled: bezeled,
  Filled: filled,
};

export default function getButtonStyle({
  variantStyle = "Borderless",
  size = "Medium",
}: VariantsProps) {
  const { container: containerSize, text: textSize } = bySize[size];
  const { container: containerStyle, text: textStyle } = byStyle[variantStyle];

  return {
    container: {
      ...baseStyle,
      ...containerSize,
      ...containerStyle,
    },
    text: {
      ...textSize,
      ...textStyle,
    },
  };
}
