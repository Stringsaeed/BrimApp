import { makeTheme } from "dripsy";

import { colors } from "./colors";
import { fonts } from "./typography";

const theme = makeTheme({
  customFonts: {
    [fonts.regular]: {
      default: fonts.regular,
      normal: fonts.regular,
      600: fonts.semiBold,
      400: fonts.regular,
      500: fonts.medium,
      // I recommend setting every weight here
      bold: fonts.bold,
      900: fonts.bold,
      800: fonts.bold,
      700: fonts.bold,
    },
  },
  space: {
    $7: 256,
    $6: 128,
    $5: 64,
    $4: 32,
    $3: 16,
    $2: 8,
    $1: 4,
    // recommended: set 0 first, then double for consistent nested spacing
    $0: 0,
  },
  //   text: {},
  fonts: {
    root: fonts.regular, // <- this string must match the key you set in custom fonts above!
  },
  fontSizes: {
    $0: 12,
    $1: 14,
    $2: 16,
    $3: 18,
    $4: 24,
    $5: 28,
    $6: 32,
  },
  layout: {
    row: {
      flexDirection: "row",
    },
    flex: {
      flex: 1,
    },
  },
  types: {
    reactNativeTypesOnly: true,
  },
  colors,
});

type MyTheme = typeof theme;

declare module "dripsy" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DripsyCustomTheme extends MyTheme {}
}

export default theme;
