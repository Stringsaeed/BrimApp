/*
we use system fonts for native to give a more native feeling to the app
you can safely delete this file and just use the same font we use on web
*/
import { createFont, getVariableValue } from "tamagui";

const headingSize = {
  true: 14,
  16: 134,
  15: 114,
  14: 92,
  13: 72,
  12: 62,
  11: 55,
  10: 46,
  9: 30,
  8: 23,
  7: 20,
  6: 18,
  5: 16,
  4: 14,
  3: 13,
  2: 12,
  1: 11,
};

export const headingFont = createFont({
  lineHeight: Object.fromEntries(
    Object.entries(headingSize).map(([k, v]) => [k, getVariableValue(v) + 4])
  ),
  size: Object.fromEntries(
    Object.entries(headingSize).map(([k, v]) => [k, getVariableValue(v)])
  ),
  transform: {
    6: "uppercase",
    7: "none",
  },
  weight: {
    3: "500",
    4: "700",
  },
  family: "System",
});

const bodySize = {
  true: 14,
  16: 134,
  15: 114,
  14: 92,
  13: 72,
  12: 62,
  11: 55,
  10: 46,
  9: 30,
  8: 23,
  7: 20,
  6: 18,
  5: 16,
  4: 14,
  3: 13,
  2: 12,
  1: 11,
};
export const bodyFont = createFont({
  lineHeight: Object.fromEntries(
    Object.entries(headingSize).map(([k, v]) => [k, getVariableValue(v) * 1.5])
  ),
  size: Object.fromEntries(
    Object.entries(bodySize).map(([k, v]) => [k, getVariableValue(v)])
  ),
  weight: {
    1: "300",
    // 2 will be 300
    4: "400",
    6: "600",
  },
  family: "System",
});
