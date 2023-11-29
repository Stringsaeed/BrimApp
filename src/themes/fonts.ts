import { createInterFont } from "@tamagui/font-inter";

export const headingFont = createInterFont(
  {
    transform: {
      6: "uppercase",
      7: "none",
    },
    face: {
      700: { normal: "InterBold" },
    },
    weight: {
      3: "500",
      4: "700",
    },
    size: {
      6: 15,
    },
  },
  {
    sizeLineHeight: (fontSize) => fontSize + 4,
    sizeSize: (size) => size,
  }
);

export const bodyFont = createInterFont(
  {
    face: {
      700: { normal: "InterBold" },
    },
  },
  {
    sizeSize: (size) => Math.round(size * 1.1),
    sizeLineHeight: (size) => size + 5,
  }
);
