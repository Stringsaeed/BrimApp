import React, { useContext, useMemo } from "react";

import { ButtonProps } from "./types";
import getButtonStyle from "./variants";

const ButtonContext = React.createContext<
  (ButtonProps & { buttonStyle: ReturnType<typeof getButtonStyle> }) | undefined
>(undefined);

export function useButtonContext() {
  const context = useContext(ButtonContext);
  if (!context) {
    throw new Error("No button context");
  }

  return context;
}

export function ButtonProvider(props: ButtonProps) {
  const { children, iconOnly, ...restProps } = props;

  const buttonStyle = getButtonStyle({
    variantStyle: props.variantStyle,
    size: props.size,
    iconOnly,
  });

  const contextValue = useMemo(
    () => ({
      ...restProps,
      buttonStyle,
    }),
    [buttonStyle, restProps]
  );

  return (
    <ButtonContext.Provider value={contextValue}>
      {children}
    </ButtonContext.Provider>
  );
}
