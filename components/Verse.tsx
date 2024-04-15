import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { VerseProps } from '../types/types';

import { VERSE_NUM_F_SIZE, VERSE_F_SIZE } from '../utils/Globals';
import {
  useFonts,
  LibreCaslonText_400Regular,
} from '@expo-google-fonts/libre-caslon-text';


const Verse = (props: VerseProps & { fontSize: number }) => {

  let [fontsLoaded] = useFonts({
    LibreCaslonText_400Regular,
  });

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
    paddingRight: 8,
    fontFamily: 'LibreCaslonText_400Regular',
  },
  verse: {
    textAlign: 'left',
    paddingBottom: 8,
    fontFamily: 'LibreCaslonText_400Regular',
  }
});

export default Verse