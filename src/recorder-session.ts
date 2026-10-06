import { LocalStorage } from "@raycast/api";
import { apiPost, TypeWhisperError } from "./api";
import type { RecorderStopResponse } from "./types";

const LAST_RECORDER_SESSION_ID_KEY = "last-recorder-session-id";

export async function setLastRecorderSessionId(id: string): Promise<void> {
  await LocalStorage.setItem(LAST_RECORDER_SESSION_ID_KEY, id);
}

export async function getLastRecorderSessionId(): Promise<string | undefined> {
  const id = await LocalStorage.getItem<string>(LAST_RECORDER_SESSION_ID_KEY);
  return id ?? undefined;
}

export async function stopRecording(): Promise<RecorderStopResponse> {
  let response: RecorderStopResponse;
  try {
    response = await apiPost<RecorderStopResponse>("/v1/recorder/stop");
  } catch (error) {
    // The API can only stop recordings it started itself.
    if (error instanceof TypeWhisperError && error.statusCode === 409) {
      throw new TypeWhisperError(
        "This recording was started in TypeWhisper. Stop it there.",
      );
    }
    throw error;
  }
  await setLastRecorderSessionId(response.id);
  return response;
}
