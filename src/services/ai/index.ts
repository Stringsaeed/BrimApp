import Constants from "expo-constants";

const hostUri = Constants.expoConfig?.hostUri;
const hostUriWithoutPort = hostUri?.replace(/:\d+$/, "");

const API_URL = `http://${hostUriWithoutPort}:3000`;

async function query(type: "fixGrammar" | "rephrase", text: string) {
  const response = await fetch(API_URL, {
    body: JSON.stringify({ type, text }),
    method: "POST",
  });

  if (!response.ok) {
    return text;
  }

  const data: { result: string } = await response.json();

  if (!data.result) {
    return text;
  }

  if (data.result === "NONE") {
    return text;
  }

  return data.result;
}

export async function fixGrammarAPI(prompt: string) {
  return await query("fixGrammar", prompt);
}

export async function rephraseSentencesAPI(text: string) {
  return await query("rephrase", text);
}
