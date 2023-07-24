import React from "react";

import BaseText, { BaseTextProps } from "components/typography/base-text";
import { theme } from "themes";

type Props = BaseTextProps & {
  emphasized?: boolean;
};

const getTitle3Style = ({ emphasized }: Props) => {
  let variantName: keyof typeof theme.textVariants = "Title3";

  if (emphasized) {
    variantName = `${variantName}/Emphasized`;
  }

  return theme.textVariants[variantName];
};

export default function Title3({ emphasized = false, ...restProps }: Props) {
  const style = getTitle3Style({ emphasized });

  return <BaseText {...restProps} style={style} />;
}
