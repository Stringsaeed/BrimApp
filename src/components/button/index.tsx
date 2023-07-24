import React from "react";

import { ButtonContainer } from "./container";
import { ButtonProvider } from "./context";
import ButtonLabel from "./label";
import { ButtonProps } from "./types";

export default function Button({ children, ...restProps }: ButtonProps) {
  return (
    <ButtonProvider {...restProps}>
      <ButtonContainer>{children}</ButtonContainer>
    </ButtonProvider>
  );
}
Button.Label = ButtonLabel;
