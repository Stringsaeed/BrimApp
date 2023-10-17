import {
  FlagsmithContextType,
  FlagsmithProvider,
  useFlags,
} from "flagsmith/react";
import React from "react";
import flagsmith from "react-native-flagsmith";

import { AsyncStorage } from "services/storage";

const environmentID = process.env.EXPO_PUBLIC_FLAGSMITH_ENVIRONMENT_ID;

export function FeatureFlagsProvider({
  children,
}: {
  children: FlagsmithContextType["children"];
}) {
  if (!environmentID) {
    return children;
  }
  return (
    <FlagsmithProvider
      flagsmith={flagsmith}
      options={{
        enableLogs: __DEV__,
        cacheFlags: true,
        environmentID,
        AsyncStorage,
      }}
    >
      {children}
    </FlagsmithProvider>
  );
}

export function useFeatureFlag(_flags: string) {
  return useFlags([_flags])[_flags];
}
