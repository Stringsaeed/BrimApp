import React from "react";

import { theme } from "themes";

import BaseText, { BaseTextProps } from "../base-text";

type Props = BaseTextProps & {
  italic?: boolean;
  emphasized?: boolean;
};

const getBodyStyle = ({ italic, emphasized }: Props) => {
  let variantName: keyof typeof theme.textVariants = "Body";

  if (italic) {
    variantName = `${variantName}/Italic`;
  }

  if (emphasized) {
    variantName = `${variantName}/Emphasized`;
  }

  return theme.textVariants[variantName];
};

export default function Body({
  italic = false,
  emphasized = false,
  ...restProps
}: Props) {
  const style = getBodyStyle({ italic, emphasized });
  return <BaseText {...restProps} style={style} />;
}
