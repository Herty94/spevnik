export type VerseProps = {
  lines: string[]
  number: number
}

export type SongProps = {
  verses: VerseProps[]
  number: number
  text: string
  music: string
}
