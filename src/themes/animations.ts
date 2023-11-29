import { createAnimations } from "@tamagui/animations-moti";

export const animations = createAnimations({
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
  tooltip: {
    stiffness: 100,
    damping: 10,
    mass: 0.9,
  },
  medium: {
    stiffness: 120,
    damping: 15,
    mass: 1,
  },
  "200ms": {
    type: "timing",
    duration: 200,
  },
  "100ms": {
    type: "timing",
    duration: 100,
  },
  slow: {
    stiffness: 40,
    damping: 15,
  },
});
