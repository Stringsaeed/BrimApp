import React from "react";

import BaseText, { BaseTextProps } from "components/typography/base-text";
import { theme } from "themes";

type Props = BaseTextProps & {
  italic?: boolean;
  emphasized?: boolean;
};

const getBodyStyle = ({ emphasized, italic }: Props) => {
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
  emphasized = false,
  italic = false,
  ...restProps
}: Props) {
  const style = getBodyStyle({ emphasized, italic });
  return <BaseText {...restProps} style={style} />;
}
