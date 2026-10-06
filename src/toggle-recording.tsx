import { showHUD } from "@raycast/api";
import { showFailureToast } from "@raycast/utils";
import { apiGet, apiPost, errorMessage, TypeWhisperError } from "./api";
import { setLastRecorderSessionId } from "./recorder-session";
import type {
  RecorderStartResponse,
  RecorderStatusResponse,
  RecorderStopResponse,
} from "./types";

export default async function Command() {
  try {
    const status = await apiGet<RecorderStatusResponse>("/v1/recorder/status");

    if (status.recording) {
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
      await showHUD(
        "Recording stopped. Open Show Last Recording for the transcript.",
      );
    } else {
      const response =
        await apiPost<RecorderStartResponse>("/v1/recorder/start");
      await setLastRecorderSessionId(response.id);
      await showHUD("Recording started");
    }
  } catch (error) {
    await showFailureToast(errorMessage(error, "Failed to toggle recording"), {
      title: "TypeWhisper",
    });
  }
}
