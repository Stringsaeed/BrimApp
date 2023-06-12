import React from "react";

import BaseText, { BaseTextProps } from "components/typography/base-text";
import { theme } from "themes";

type Props = BaseTextProps & {
  emphasized?: boolean;
};

const getLargeTitleStyle = ({ emphasized }: Props) => {
  let variantName: keyof typeof theme.textVariants = "LargeTitle";

  if (emphasized) {
    variantName = `${variantName}/Emphasized`;
  }

  return theme.textVariants[variantName];
};

export default function LargeTitle({
  emphasized = false,
  ...restProps
}: Props) {
  const style = getLargeTitleStyle({ emphasized });

  return <BaseText {...restProps} style={style} />;
}
