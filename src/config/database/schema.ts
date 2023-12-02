import { appSchema, tableSchema } from "@nozbe/watermelondb";

const noteSchema = tableSchema({
  columns: [
    { name: "deleted_at", isOptional: true, type: "number" },
    { isOptional: true, type: "string", name: "title" },
    { isOptional: true, type: "string", name: "note" },
    { name: "is_private", type: "boolean" },
    { name: "created_at", type: "number" },
    { name: "updated_at", type: "number" },
    { name: "user_id", type: "string" },
    { name: "status", type: "string" },
  ],
  name: "notes",
});

const brimAppSchema = appSchema({
  tables: [noteSchema],
  version: 1,
});

export default brimAppSchema;
