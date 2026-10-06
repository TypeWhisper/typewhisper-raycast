import { closeMainWindow, showHUD } from "@raycast/api";
import { apiGet, apiPost, TypeWhisperError } from "./api";
import type { DictationStartResponse, DictationStatusResponse } from "./types";

export async function startDictationWithWorkflow(workflow: {
  id: string;
  name: string;
}): Promise<void> {
  const status = await apiGet<DictationStatusResponse>("/v1/dictation/status");
  if (status.is_recording) {
    throw new TypeWhisperError(
      "A dictation is already running. Stop it with Start Dictation first.",
    );
  }

  // Close Raycast first so the dictation goes into the app you came from.
  await closeMainWindow();
  await apiPost<DictationStartResponse>("/v1/dictation/start", {
    workflow_id: workflow.id,
  });
  await showHUD(`Dictation started with "${workflow.name}"`);
}
