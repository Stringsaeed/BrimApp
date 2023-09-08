import "react-native-gesture-handler";
import React from "react";
import { enableFreeze } from "react-native-screens";

import { AppContainer } from "containers";
import { useLoadAssets } from "hooks";

enableFreeze(false);

export default function App() {
  const isLoaded = useLoadAssets();

  if (!isLoaded) {
    return null;
  }

  return <AppContainer />;
}
