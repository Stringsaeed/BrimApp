import theme from "./theme";
import { ColorKeyOrString } from "./types";

export function getColorValue(color: ColorKeyOrString) {
  return color in theme.colors
    ? theme.colors[color as keyof typeof theme.colors]
    : color;
}
