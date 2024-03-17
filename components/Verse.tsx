import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { VerseProps } from '../types/types';
export const VERSE_F_SIZE = 16
export const VERSE_NUM_F_SIZE = 16

const Verse = (props: VerseProps & { fontSize: number }) => {
  return (
    <View style={{ flex: 1, flexDirection: "row", paddingTop: 26, flexWrap: 'wrap' }}>
      <Text style={{ ...styles.number, fontSize: VERSE_NUM_F_SIZE + props.fontSize }}>{props.number}.</Text>
      <View style={{ flexDirection: "column" }} >
        {props.lines && props.lines.map((l, i) =>
          <Text style={{ ...styles.verse, fontSize: VERSE_F_SIZE + props.fontSize }} key={i}>{l}</Text>
        )}</View>
    </View>
  )
}

const styles = StyleSheet.create({

  number: {
    fontWeight: "600",
    paddingRight: 8
  },
  verse: {
    textAlign: 'left',
    flexWrap: 'wrap',
    paddingBottom: 8,
  }
});

export default Verse