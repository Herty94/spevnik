import React from 'react'
import { SongProps } from '../types/types'
import { Text } from 'react-native'
import Verse from './Verse'


const SongPage = (props: SongProps) => {
  return (
    <>
      <Text>{props.number}</Text>
      {props.verses && props.verses.map((v, i) => <Verse key={i} {...v} />)}
      <Text>{props.music}</Text>
      <Text>{props.text}</Text>
    </>
  )
}

export default SongPage