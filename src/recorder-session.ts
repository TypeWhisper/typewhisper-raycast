import { LocalStorage } from "@raycast/api";

const LAST_RECORDER_SESSION_ID_KEY = "last-recorder-session-id";

export async function setLastRecorderSessionId(id: string): Promise<void> {
  await LocalStorage.setItem(LAST_RECORDER_SESSION_ID_KEY, id);
}

export async function getLastRecorderSessionId(): Promise<string | undefined> {
  const id = await LocalStorage.getItem<string>(LAST_RECORDER_SESSION_ID_KEY);
  return id ?? undefined;
}
