import { generateText } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { decode } from "html-entities";

const contentInsideTagsRegex = /<(\w+)[^>]*>((?:[^<]+|<(?!\/?\1))*)<\/\1>/i;
const globalRegex = /<(\w+)[^>]*>((?:[^<]+|<(?!\/?\1))*)<\/\1>/gi;

export function getNoteTitleV2(note?: string): string {
  if (!note) return "";
  try {
    const json = JSON.parse(note);
    const text = generateText(json, [StarterKit]);
    return getNoteTitle(text);
  } catch {
    return getNoteTitle(note);
  }
}

export function getNoteTitle(note?: string): string {
  if (!note) return "";

  // local match
  const [, , z] = note.match(contentInsideTagsRegex) ?? [];

  if (!z) return cleanup(note);
  // global match
  const globalZMatch = z.match(globalRegex);
  if (globalZMatch) {
    if (globalZMatch.length > 1) {
      return getNoteTitle(globalZMatch[0]);
    }
    return cleanup(z);
  }

  return cleanup(getNoteTitle(z));
}

// export function getNoteTitle(note: string) {
//   // get the text inside the tags
//   const [, , contentInsideTag] = note.match(contentInsideTagsRegex) ?? [];

//   // handle null
//   if (!contentInsideTag) return "";
//   // get 2nd the group
//   const title = contentInsideTag.replace(/<[^>]+>/gi, "");

//   return decode(title);
// }

export function cipherTitle(title: string) {
  return title.replace(
    /(\w)\w+/g,
    (match, firstChar) => firstChar + "*".repeat(match.length - 1)
  );
}

export function cleanup(text: string) {
  return decode(text.replace(/<[^>]+>/gi, ""));
}
