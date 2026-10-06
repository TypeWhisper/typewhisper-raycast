# TypeWhisper

Control [TypeWhisper](https://www.typewhisper.com) directly from Raycast - start dictation, browse transcription history, manage profiles, and transcribe audio files.

## Prerequisites

- [TypeWhisper](https://www.typewhisper.com) must be installed and running on your Mac
- The API server must be enabled in TypeWhisper: **Settings > Advanced > Enable API Server**

## Commands

| Command                     | Description                                                         |
| --------------------------- | ------------------------------------------------------------------- |
| **Start Dictation**         | Start or stop voice dictation with a single keystroke               |
| **Search History**          | Browse and search your transcription history                        |
| **Show Last Transcription** | Copy the most recent transcription to your clipboard                |
| **Switch Profile**          | View and toggle TypeWhisper profiles                                |
| **Transcribe File**         | Transcribe an audio file (WAV, MP3, M4A, FLAC, OGG, AAC, MP4, WebM) |

## Configuration

The extension finds TypeWhisper's API port and API token automatically, so it also works when **Require API Token** is turned on. If you use a custom port, set it in the extension preferences under **API Port Override**.
