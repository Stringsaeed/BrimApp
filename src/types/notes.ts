import { z } from "zod";

import { dateSchema } from "./date";

const statusSchema = z.enum(["draft", "archived", "trashed", "published"]);

export const noteSchema = z.object({
  status: statusSchema.optional().default("published"),
  is_private: z.boolean().optional().default(false),
  user_id: z.string().optional(),
  title: z.string().optional(),
  note: z.string().optional(),
  updated_at: dateSchema,
  created_at: dateSchema,
  deleted_at: dateSchema,
  id: z.string().uuid(),
});

export const notesSchema = z.array(noteSchema);

export type Note = z.infer<typeof noteSchema>;
