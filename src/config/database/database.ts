import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { Platform } from "react-native";

import { NoteModel } from "models";

import migrations from "./migration";
import brimAppSchema from "./schema";

const adapter = new SQLiteAdapter({
  // additional installation steps have to be taken - disable if you run into issues...)
  jsi: Platform.OS === "ios",
  onSetUpError: () => {},
  // (optional database name or file system path)
  // dbName: 'myapp',
  // (recommended option, should work flawlessly out of the box on iOS. On Android,
  schema: brimAppSchema,
  // (You might want to comment it out for development purposes -- see Migrations documentation)
  migrations,
});

// Then, make a Watermelon database from it!
const database = new Database({
  modelClasses: [NoteModel],
  adapter,
});

export default database;
