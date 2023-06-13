import { z } from "zod";

// export const noteFirebaseSnapshotSchema = z.object({
//   created_at: z.string(),
//   id: z.string(),
//   is_draft: z.boolean(),
//   note: z.string(),
//   user: z.string(),
// });
export const noteSchema = z.object({
  is_private: z.boolean().nullish().optional().default(false),
  created_at: z.string().nullish(),
  is_draft: z.boolean().nullish(),
  title: z.string().optional(),
  user: z.string().nullish(),
  note: z.string(),
  id: z.string(),
});

export const notesSchema = z.array(noteSchema);
