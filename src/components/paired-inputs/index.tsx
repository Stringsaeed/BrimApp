import { View } from "moti";
import React from "react";

import Row from "components/row";

type Props = {
  children: [React.ReactNode, React.ReactNode];
};

export default function PairedInputs({ children }: Props) {
  return (
    <Row gap={16}>
      <View style={{ alignSelf: "stretch" }}>{children[0]}</View>
      <View style={{ flex: 1 }}>{children[1]}</View>
    </Row>
  );
}
