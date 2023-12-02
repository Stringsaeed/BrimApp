import { Model } from "@nozbe/watermelondb";
import { text, field, readonly, date } from "@nozbe/watermelondb/decorators";

export default class NoteModel extends Model {
  static table = "notes";

  @text("status") status!: string;
  @field("is_private") is_private?: boolean;
  @text("user_id") user_id!: string;
  @text("title") title?: string;
  @text("note") note?: string;

  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;

  @date("deleted_at") deletedAt?: Date;
}
