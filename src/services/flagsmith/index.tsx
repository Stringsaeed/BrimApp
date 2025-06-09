import {
  FlagsmithContextType,
  FlagsmithProvider,
  useFlags,
} from "flagsmith/react";
import React from "react";
import flagsmith from "react-native-flagsmith";

import { config } from "@/config";
import { AsyncStorage } from "@/services/storage";

const environmentID = config.flagsmithEnvironmentId;

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
        defaultFlags: {
          record_voice_notes: {
            enabled: true,
            value: true,
            id: 1,
          },
          rephrase_with_ai: {
            enabled: true,
            value: true,
            id: 2,
          },
        },
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
