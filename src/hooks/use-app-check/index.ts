import appCheck from "@react-native-firebase/app-check";
import { useEffect } from "react";

import { config } from "config";

export default function useAppCheck() {
  const initializeAppCheck = async () => {
    const rnfbProvider = appCheck().newReactNativeFirebaseAppCheckProvider();

    rnfbProvider.configure({
      apple: {
        provider: __DEV__ ? "debug" : "appAttestWithDeviceCheckFallback",
        debugToken: config.firebaseAppCheckToken.ios,
      },
      android: {
        debugToken: config.firebaseAppCheckToken.android,
        provider: __DEV__ ? "debug" : "playIntegrity",
      },
    });

    appCheck().initializeAppCheck({
      isTokenAutoRefreshEnabled: true,
      provider: rnfbProvider,
    });
  };

  useEffect(() => {
    initializeAppCheck();
  }, []);
}
