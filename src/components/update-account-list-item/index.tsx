import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Pencil } from "@tamagui/lucide-icons";
import React, { useRef } from "react";
import { ListItem, YGroup } from "tamagui";

import UpdateAccountSheet from "@/components/update-account-sheet";

type Props = {
  title: string;
  subTitle: string;
  type: "displayName" | "email" | "phone";
};

export default function UpdateAccountListItem({
  subTitle,
  title,
  type,
}: Props) {
  const ref = useRef<BottomSheetModal>(null);
  const onPress = () => ref.current?.present();
  return (
    <YGroup.Item>
      <ListItem
        title={title}
        subTitle={subTitle}
        onPress={onPress}
        iconAfter={Pencil}
      />
      <UpdateAccountSheet ref={ref} type={type} defaultValue={subTitle} />
    </YGroup.Item>
  );
}
