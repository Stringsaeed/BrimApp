import React from "react";

import BaseText, { BaseTextProps } from "components/typography/base-text";
import { theme } from "themes";

type Props = BaseTextProps & {
  emphasized?: boolean;
  italic?: boolean;
};

const getSubheadlineStyle = ({ emphasized, italic }: Props) => {
  let variantName: keyof typeof theme.textVariants = "Subheadline";

  if (emphasized) {
    variantName = `${variantName}/Emphasized`;
  } else if (italic) {
    variantName = `${variantName}/Italic`;
  }

  return theme.textVariants[variantName];
};

export default function Subheadline({
  emphasized = false,
  ...restProps
}: Props) {
  const style = getSubheadlineStyle({ emphasized });

  return <BaseText {...restProps} style={style} />;
}
