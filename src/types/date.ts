import { z } from "zod";

export const dateSchema = z
  .union([z.string(), z.date(), z.number()])
  .optional();

export type DateType = z.infer<typeof dateSchema>;
