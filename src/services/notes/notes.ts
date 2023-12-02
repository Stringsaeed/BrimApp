import { wmDatabase } from "config";
import { NoteModel } from "models";
import { NoteSchema } from "types";

export const NoteService = {
  create: async (input: Omit<NoteSchema, "id">) => {
    return await wmDatabase.write(async () => {
      const note = await NoteService.getCollection().create((post) => {
        post.title = input.title;
        post.note = input.note;
        post.is_private = input.is_private;
        post.status = input.status || "draft";
      });

      return note;
    });
  },
  update: async (id: string, input: Partial<NoteSchema>) => {
    return await wmDatabase.write(async () => {
      (await NoteService.getCollection().find(id)).update((note) => {
        for (const key in input) {
          if (key === "id") continue;
          // @ts-expect-error
          note[key] = input[key];
        }

        return note;
      });
    });
  },
  delete: async (id: string) => {
    return await wmDatabase.write(async () => {
      (await NoteService.getCollection().find(id)).destroyPermanently();
    });
  },
  get: async (id: string) => {
    return NoteService.getCollection().find(id);
  },
  getCollection: () => wmDatabase.get<NoteModel>("notes"),
};
