import { z } from "zod";

// export const noteFirebaseSnapshotSchema = z.object({
//   created_at: z.string(),
//   id: z.string(),
//   is_draft: z.boolean(),
//   note: z.string(),
//   user: z.string(),
// });
export const noteSchema = z.object({
  created_at: z.string().nullish(),
  id: z.string(),
  is_draft: z.boolean().nullish(),
  note: z.string(),
  user: z.string().nullish(),
  is_private: z.boolean().nullish().optional().default(false),
});

export const notesSchema = z.array(noteSchema);
