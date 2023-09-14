import React from "react";

import AnimatedKeyboardView from "components/animated-keyboard-view";

import { AuthLayoutProps } from "./types";

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <AnimatedKeyboardView offset={40}>{children}</AnimatedKeyboardView>;
}
