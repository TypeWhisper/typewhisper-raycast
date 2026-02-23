/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** API Port Override - Leave empty for auto-discovery. Only set if using a custom port. */
  "port": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `search-history` command */
  export type SearchHistory = ExtensionPreferences & {}
  /** Preferences accessible in the `switch-profile` command */
  export type SwitchProfile = ExtensionPreferences & {}
  /** Preferences accessible in the `start-dictation` command */
  export type StartDictation = ExtensionPreferences & {}
  /** Preferences accessible in the `show-last-transcription` command */
  export type ShowLastTranscription = ExtensionPreferences & {}
  /** Preferences accessible in the `transcribe-file` command */
  export type TranscribeFile = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `search-history` command */
  export type SearchHistory = {}
  /** Arguments passed to the `switch-profile` command */
  export type SwitchProfile = {}
  /** Arguments passed to the `start-dictation` command */
  export type StartDictation = {}
  /** Arguments passed to the `show-last-transcription` command */
  export type ShowLastTranscription = {}
  /** Arguments passed to the `transcribe-file` command */
  export type TranscribeFile = {}
}

