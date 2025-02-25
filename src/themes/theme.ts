import { config as tConfig } from "@tamagui/config";
import { shorthands } from "@tamagui/shorthands";
import { themes, tokens } from "@tamagui/themes";
import { createTamagui } from "tamagui";

import { animations } from "./animations";
import { bodyFont, headingFont } from "./fonts";

const config = createTamagui({
  ...tConfig,
  themes: {
    ...tConfig.themes,
    ...themes,
    light: {
      ...tConfig.themes.light,
      ...themes.light,
      backgroundTransparent: "#ffffff00",
      accent: themes.light.pink10,
      background: "#ffffff",
    },
    dark: {
      ...tConfig.themes.dark,
      ...themes.dark,
      backgroundTransparent: "#00000000",
      accent: themes.dark.pink10,
      background: "#000000",
    },
  },
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  shouldAddPrefersColorThemes: false,
  themeClassNameOnRoot: false,
  animations: animations,
  defaultTheme: "dark",
  shorthands,
  tokens,
});

export type AppConfig = typeof config;

declare module "tamagui" {
  // overrides TamaguiCustomConfig so your custom types

  // work everywhere you import `tamagui`

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;
