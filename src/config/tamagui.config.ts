import { createAnimations } from "@tamagui/animations-moti";
import { createInterFont } from "@tamagui/font-inter";
import { createMedia } from "@tamagui/react-native-media-driver";
import { shorthands } from "@tamagui/shorthands";
import { themes, tokens } from "@tamagui/themes";
import { createTamagui } from "tamagui";

const animations = createAnimations({
  bouncy: {
    stiffness: 100,
    type: "spring",
    damping: 10,
    mass: 0.9,
  },
  quick: {
    stiffness: 250,
    type: "spring",
    damping: 20,
    mass: 1.2,
  },
  lazy: {
    type: "spring",
    stiffness: 60,
    damping: 20,
  },
});
const headingFont = createInterFont();

const bodyFont = createInterFont();
const config = createTamagui({
  media: createMedia({
    pointerCoarse: { pointer: "coarse" },
    hoverNone: { hover: "none" },
    gtLg: { minWidth: 1280 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtXs: { minWidth: 660 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    xxl: { maxWidth: 1600 },
    xl: { maxWidth: 1420 },
    lg: { maxWidth: 1280 },
    md: { maxWidth: 1020 },
    sm: { maxWidth: 800 },
    xs: { maxWidth: 660 },
  }),
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  shouldAddPrefersColorThemes: false,
  themeClassNameOnRoot: false,
  defaultTheme: "dark",
  shorthands,
  animations,
  tokens,
  themes,
});
export type AppConfig = typeof config;
declare module "tamagui" {
  // overrides TamaguiCustomConfig so your custom types

  // work everywhere you import `tamagui`

  interface TamaguiCustomConfig extends AppConfig {}
}
export default config;
