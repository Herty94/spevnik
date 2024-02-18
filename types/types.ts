export type VerseProps = {
  lines: string[]
  number: string
}

export type SongProps = {
  verses: VerseProps[]
  number: string
  text: string
  music: string
}
