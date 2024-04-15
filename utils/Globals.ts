import { createContext } from 'react'
import { AppContextProps, ContentType, SongProps } from '../types/types'
import songs from '../data/hymns.json'
import content from '../data/content.json'

export const AppContext = createContext<Partial<AppContextProps>>({
  songNumber: 1
})

export const NUMBER_F_SIZE = 30
export const LAST_SONG = 627

export const VERSE_F_SIZE = 16
export const VERSE_NUM_F_SIZE = 16

export const songArray = songs.song as SongProps[]

export const contentArray = content.section as ContentType[]
