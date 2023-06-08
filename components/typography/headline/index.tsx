import React from "react";

import { theme } from "themes";

import BaseText, { BaseTextProps } from "../base-text";

type Props = BaseTextProps & {
  emphasized?: boolean;
};

const getHeadlineStyle = ({ emphasized }: Props) => {
  let variantName: keyof typeof theme.textVariants = "Headline";

  if (emphasized) {
    variantName = `${variantName}/Emphasized`;
  }

  return theme.textVariants[variantName];
};

export default function Headline({ emphasized = false, ...restProps }: Props) {
  const style = getHeadlineStyle({ emphasized });

  return <BaseText {...restProps} style={style} />;
}
