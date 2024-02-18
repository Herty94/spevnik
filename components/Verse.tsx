import React from 'react'
import { Text } from 'react-native';
import { VerseProps } from '../types/types';



const Verse = (props: VerseProps) => {
  return (<>
    <Text>{props.number}</Text>
    {props.lines && props.lines.map((l, i) =>
      <Text key={i}>{l}</Text>
    )}</>
  )
}

export default Verse