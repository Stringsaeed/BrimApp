import { createAnimations } from "@tamagui/animations-moti";
import { createInterFont } from "@tamagui/font-inter";
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
  themes: {
    ...themes,
    light: {
      ...themes.light,
      backgroundTransparent: "#ffffff00",
      accent: themes.light.blue10,
      background: "#ffffff",
    },
    dark: {
      ...themes.dark,
      backgroundTransparent: "#00000000",
      accent: themes.dark.blue10,
      background: "#000000",
    },
  },
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  shouldAddPrefersColorThemes: false,
  themeClassNameOnRoot: false,
  defaultTheme: "dark",
  animations,
  shorthands,
  tokens,
});

export type AppConfig = typeof config;

declare module "tamagui" {
  // overrides TamaguiCustomConfig so your custom types

  // work everywhere you import `tamagui`

  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;
