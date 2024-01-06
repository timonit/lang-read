export type TranslateResponse = {
  "source-language": string,
  "source-text": string,
  "destination-language": string,
  "destination-text": string,
  "pronunciation": {
    "source-text-phonetic": string | null,
    "source-text-audio": string,
    "destination-text-audio": string
  },
  "translations": {
    "all-translations": any | null,
    "possible-translations": string[],
    "possible-mistakes": any | null
  },
  "definitions": string | null,
  "see-also": string | null
}
