import { format } from "date-fns/format";
import { parseISO } from "date-fns/parseISO";
import React from "react";
import { SizableText, SizableTextProps } from "tamagui";

import { DateType } from "@/types";

type DateTextProps = Exclude<
  SizableTextProps & {
    date?: DateType;
    dateFormat?: string;
  },
  "children"
>;

const getDate = (date: DateType): Date | number => {
  if (!date) return new Date();
  return typeof date === "string" ? parseISO(date) : date;
};

export default function DateText({
  textAlign = "center",
  dateFormat = "PP",
  size = "$1",
  date,
  ...restProps
}: DateTextProps) {
  if (!date) return null;

  const value = format(getDate(date), dateFormat);

  return (
    <SizableText textAlign={textAlign} size={size} {...restProps}>
      {value}
    </SizableText>
  );
}
