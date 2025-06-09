import React from "react";

import AnimatedKeyboardView from "@/components/animated-keyboard-view";

import { AuthLayoutProps } from "./types";

export default function AuthLayout({
  handleTopSafeArea = true,
  children,
}: AuthLayoutProps) {
  return (
    <AnimatedKeyboardView handleTopSafeArea={handleTopSafeArea} offset={40}>
      {children}
    </AnimatedKeyboardView>
  );
}
