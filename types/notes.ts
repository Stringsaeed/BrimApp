export type Note = {
  created_at?: string | null;
  id: string;
  is_draft?: boolean | null;
  note: string;
  user?: string | null;
  is_private?: boolean | null;
  title?: string;
  updated_at?: string | null;
  is_archived?: boolean | null;
};
