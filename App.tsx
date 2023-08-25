import "react-native-gesture-handler";
import React from "react";

import { AppContainer } from "containers";
import { useLoadAssets } from "hooks";

export default function App() {
  const isLoaded = useLoadAssets();

  if (!isLoaded) {
    return null;
  }

  return <AppContainer />;
}
