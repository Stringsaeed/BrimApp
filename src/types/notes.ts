import { z } from "zod";

import { NoteModel } from "models";

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
  id: z.string(),
});

export const notesSchema = z.array(noteSchema);
export type NoteSchema = z.infer<typeof noteSchema>;
export type Note = NoteModel;
