import "react-native-gesture-handler";
import React from "react";
import { enableFreeze } from "react-native-screens";

import { AppContainer } from "containers";
import { useLoadAssets } from "hooks";
import { Sentry } from "services";

enableFreeze(false);

function App() {
  const isLoaded = useLoadAssets();

  if (!isLoaded) {
    return null;
  }

  return <AppContainer />;
}

export default Sentry.wrap(App);
