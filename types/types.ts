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
export type SearchSong = SongProps & {
  tVerse?: VerseProps
  searchText?: string
}

export type AppContextProps = {
  songNumber: number
  setSongNumber: React.Dispatch<React.SetStateAction<number>>
}

export type ContentType = {
  name: string
  begin: number
  end: number
  section?: ContentType[]
}
