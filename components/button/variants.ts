import { ViewStyle } from "react-native";

import { textVariants } from "themes/typography";

type Props = {
  style: "Borderless" | "BezeledGray" | "Bezeled" | "Filled";
  size: "Small" | "Medium" | "Large";
  iconOnly?: boolean;
};

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
    borderRadius: 40,
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
};

const bezeledGray = {
  container: {
    backgroundColor: "#7676801F",
  },
};

const bezeled = {
  container: {
    backgroundColor: "#FFFFFF1F",
  },
};

const filled = {
  container: {
    backgroundColor: "#FFFFFF",
  },
};

const byStyle = {
  BezeledGray: bezeledGray,
  Borderless: borderless,
  Bezeled: bezeled,
  Filled: filled,
};

export default function getButtonStyle({
  style = "Borderless",
  size = "Medium",
}: Props) {
  const { container: containerSize, text: textSize } = bySize[size];
  const { container: containerStyle } = byStyle[style];

  return {
    container: {
      ...baseStyle,
      ...containerSize,
      ...containerStyle,
    },
    text: {
      ...textSize,
    },
  };
}
