import { Action, ActionPanel, Detail, Icon, Keyboard } from "@raycast/api";
import { usePromise } from "@raycast/utils";
import { useEffect } from "react";
import { apiGet, errorMessage, TypeWhisperError } from "./api";
import { getLastRecorderSessionId } from "./recorder-session";
import type { RecorderSessionResponse } from "./types";

const POLL_INTERVAL_MS = 2000;

async function fetchLastRecording(): Promise<RecorderSessionResponse | null> {
  const id = await getLastRecorderSessionId();
  if (!id) {
    return null;
  }

  try {
    return await apiGet<RecorderSessionResponse>("/v1/recorder/session", {
      id,
    });
  } catch (error) {
    // TypeWhisper keeps recorder sessions only until it quits.
    if (error instanceof TypeWhisperError && error.statusCode === 404) {
      return null;
    }
    throw error;
  }
}

function markdownFor(
  session: RecorderSessionResponse | null | undefined,
  error: Error | undefined,
): string {
  if (error) {
    return `## Could not load the recording\n\n${errorMessage(error, "Unknown error")}`;
  }
  if (session === undefined) {
    return "";
  }
  if (session === null) {
    return "## No recording yet\n\nStart one with **Toggle Recording**. Recordings started before TypeWhisper last quit are not shown here.";
  }

  switch (session.status) {
    case "recording":
      return "## Recording…\n\nStop it with **Toggle Recording**.";
    case "finalizing":
      return "## Transcribing…\n\nThis view updates when the transcript is ready.";
    case "failed":
      return `## Recording failed\n\n${session.error ?? "TypeWhisper did not report a reason."}`;
    case "completed":
      return session.text
        ? session.text
        : "## No transcript\n\nThe recording was saved, but TypeWhisper did not create a transcript.";
  }
}

export default function Command() {
  const { isLoading, data, error, revalidate } = usePromise(fetchLastRecording);

  const inProgress =
    data?.status === "recording" || data?.status === "finalizing";

  useEffect(() => {
    if (!inProgress) {
      return;
    }
    const timer = setInterval(revalidate, POLL_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [inProgress, revalidate]);

  const transcript = data?.status === "completed" ? data.text : undefined;
  const outputFile = data?.output_file ?? undefined;

  return (
    <Detail
      isLoading={isLoading || inProgress}
      markdown={markdownFor(data, error)}
      actions={
        <ActionPanel>
          {transcript && (
            <>
              <Action.CopyToClipboard
                title="Copy Transcript"
                content={transcript}
              />
              <Action.Paste title="Paste Transcript" content={transcript} />
            </>
          )}
          {outputFile && (
            <>
              <Action.Open
                title="Open Recording"
                target={outputFile}
                icon={Icon.Play}
              />
              <Action.ShowInFinder path={outputFile} />
            </>
          )}
          <Action
            title="Refresh"
            icon={Icon.ArrowClockwise}
            shortcut={Keyboard.Shortcut.Common.Refresh}
            onAction={revalidate}
          />
        </ActionPanel>
      }
    />
  );
}
