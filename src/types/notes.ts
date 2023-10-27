import { z } from "zod";

// current
export const noteSchema = z.object({
  status: z
    .enum(["draft", "archived", "trashed", "published"])
    .default("published"),
  is_private: z.boolean().optional().default(false),
  deleted_at: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  user_id: z.string().optional(),
  title: z.string().optional(),
  note: z.string().optional(),
  id: z.string(),
});

// what we need
// export const newNoteSchema = z.object({
//   status: z.enum(["draft", "archived", "trashed", "published"]),
//   is_private: z.boolean().nullish().optional().default(false),
//   created_at: z.string().nullish(),
//   updated_at: z.string().nullish(),
//   title: z.string().optional(),
//   user: z.string().nullish(),
//   note: z.string(),
//   id: z.string(),
// });

export const notesSchema = z.array(noteSchema);

export type Note = z.infer<typeof noteSchema>;
