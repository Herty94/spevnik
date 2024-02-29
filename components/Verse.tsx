import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { VerseProps } from '../types/types';



const Verse = (props: VerseProps) => {
  return (
    <>
      <Text style={styles.number}>{props.number}.</Text>
      {props.lines && props.lines.map((l, i) =>
        <Text style={styles.verse} key={i}>{l}</Text>
      )}
    </>
  )
}

const styles = StyleSheet.create({

  number: {
    fontWeight: "600",
    fontSize: 16,
    padding: 8,
    textAlign: 'center'
  },
  verse: {
    textAlign: 'center',
    paddingBottom: 8,
  }
});

export default Verse