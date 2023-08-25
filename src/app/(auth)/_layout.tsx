import { Slot } from "expo-router";
import React from "react";

export default function AuthLayout() {
  return <Slot screenOptions={{ headerShown: false }} />;
}
