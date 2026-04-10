import React from "react";
import { SharedValue, useSharedValue } from "react-native-reanimated";

type PullToActionContext = {
  translateY: SharedValue<number>;
};

const pullToActionContext = React.createContext<
  PullToActionContext | undefined
>(undefined);

export function usePullToActionContext() {
  const context = React.useContext(pullToActionContext);
  if (context === undefined) {
    throw new Error(
      "usePullToActionContext must be used within a PullToActionProvider"
    );
  }
  return context;
}

interface PullToActionProviderProps {
  children: React.ReactNode;
}

export function PullToActionProvider({ children }: PullToActionProviderProps) {
  const translateY = useSharedValue(0);

  return (
    <pullToActionContext.Provider value={{ translateY }}>
      {children}
    </pullToActionContext.Provider>
  );
}
