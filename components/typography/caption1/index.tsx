import BaseText, { BaseTextProps } from "components/typography/base-text";
import { theme } from "themes";
import React from "react";

type Props = BaseTextProps & {
  emphasized?: boolean;
  italic?: boolean;
};

const getCaption1Style = ({ emphasized, italic }: Props) => {
  let variantName: keyof typeof theme.textVariants = "Caption1";

  if (italic) {
    variantName = `${variantName}/Italic`;
  }

  if (emphasized) {
    variantName = `${variantName}/Emphasized`;
  }

  return theme.textVariants[variantName];
};

export default function Caption1({
  emphasized = false,
  italic = false,
  ...restProps
}: Props) {
  const style = getCaption1Style({ emphasized, italic });

  return <BaseText {...restProps} style={style} />;
}
