export type VerseProps = {
  lines: string[]
  number: number
}

export type SongProps = {
  verses: Array<VerseProps>
  number: number
  text: string
  music: string
}

export type AppContextProps = {
  songNumber: number
  setSongNumber: React.Dispatch<React.SetStateAction<number>>
}
