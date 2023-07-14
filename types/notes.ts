import { z } from "zod";

export const noteSchema = z.object({
  is_archived: z.boolean().nullish().optional().default(false),
  is_private: z.boolean().nullish().optional().default(false),
  is_trashed: z.boolean().nullish().optional().default(false),
  created_at: z.string().nullish(),
  updated_at: z.string().nullish(),
  is_draft: z.boolean().nullish(),
  title: z.string().optional(),
  user: z.string().nullish(),
  note: z.string(),
  id: z.string(),
});

export const notesSchema = z.array(noteSchema);

export type Note = z.infer<typeof noteSchema>;
