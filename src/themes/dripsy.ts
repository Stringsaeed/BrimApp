import { makeTheme } from "dripsy";

import { colors } from "./colors";
import { fonts } from "./typography";

const theme = makeTheme({
  customFonts: {
    [fonts.secondary]: {
      600: fonts.secondarySemiBold,
      500: fonts.secondaryMedium,
      // I recommend setting every weight here
      bold: fonts.secondaryBold,
      700: fonts.secondaryBold,
      800: fonts.secondaryBold,
      900: fonts.secondaryBold,
      default: fonts.secondary,
      normal: fonts.secondary,
      400: fonts.secondary,
    },
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
  text: {
    h1: {
      fontFamily: "heading",
      fontWeight: "bold",
      fontSize: "$6",
    },
    h2: {
      fontFamily: "heading",
      fontWeight: "bold",
      fontSize: "$5",
    },
    h3: {
      fontFamily: "heading",
      fontWeight: "bold",
      fontSize: "$4",
    },
    h4: {
      fontFamily: "heading",
      fontWeight: "600",
      fontSize: "$3",
    },
    h5: {
      fontFamily: "heading",
      fontWeight: "600",
      fontSize: "$2",
    },
  },
  layout: {
    header: {
      justifyContent: "space-between",
      paddingHorizontal: "$3",
      paddingVertical: "$2",
      flexDirection: "row",
      alignItems: "center",
      gap: "$3",
    },
    "header.side": {
      justifyItems: "center",
      alignItems: "center",
      height: 48,
      width: 48,
    },
    row: {
      flexDirection: "row",
    },
    flex: {
      flex: 1,
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
  fonts: {
    heading: fonts.secondary,
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
