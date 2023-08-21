import React, { PropsWithChildren } from "react";
import Animated, { useSharedValue } from "react-native-reanimated";

import { CountryDataType } from "types";

type CountryPickerContext = {
  value: string;
  onChange: (value: CountryDataType) => void;

  sharedValue: Animated.SharedValue<string>;
};

type CountryPickerProviderProps = PropsWithChildren<{
  value: string;
  onChange: (value: string) => void;
}>;

const countryPickerContext = React.createContext<
  CountryPickerContext | undefined
>(undefined);

const useCountryPickerContext = () => {
  const context = React.useContext(countryPickerContext);

  if (context === undefined) {
    throw new Error(
      "useCountryPickerContext must be used within a CountryPickerProvider"
    );
  }

  return context;
};

function CountryPickerProvider({
  children,
  onChange,
  value,
}: CountryPickerProviderProps) {
  const sharedValue = useSharedValue(value);

  const contextValue = React.useMemo(
    () => ({
      onChange: (item: CountryDataType) => {
        sharedValue.value = item.code;
        onChange(item.code);
      },
      sharedValue,
      value,
    }),
    [value, onChange, sharedValue]
  );
  return (
    <countryPickerContext.Provider value={contextValue}>
      {children}
    </countryPickerContext.Provider>
  );
}

export { CountryPickerProvider, useCountryPickerContext };
