import { OpaqueColorValue } from "react-native";

import { colors } from "./colors";

export type ColorKeyOrString =
  | keyof typeof colors
  | (string & {})
  | OpaqueColorValue;

export type ColorProp<
  key extends "color" | "backgroundColor" | "borderColor" = "color"
> = key extends "color"
  ? {
      color?: ColorKeyOrString;
    }
  : key extends "backgroundColor"
  ? {
      backgroundColor?: ColorKeyOrString;
    }
  : key extends "borderColor"
  ? {
      borderColor?: ColorKeyOrString;
    }
  : never;
