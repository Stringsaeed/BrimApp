import React from "react";

import BaseText from "components/typography/base-text";

import { useButtonContext } from "../context";

interface ButtonLabelProps {
  children?: React.ReactNode;
}

export default function ButtonLabel({ children }: ButtonLabelProps) {
  const { buttonStyle } = useButtonContext();
  const { text } = buttonStyle;

  return <BaseText style={text}>{children}</BaseText>;
}
