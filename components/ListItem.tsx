import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { SearchSong } from '../types/types'
import {
  useFonts,
  LibreCaslonText_400Regular,
  LibreCaslonText_700Bold
} from '@expo-google-fonts/libre-caslon-text'
import { useFonts as uF, IMFellEnglish_400Regular_Italic } from '@expo-google-fonts/im-fell-english'

const ListItem = (props: SearchSong) => {
  let [fL] = uF({ IMFellEnglish_400Regular_Italic })
  let [fontsLoaded] = useFonts({
    LibreCaslonText_400Regular,
    LibreCaslonText_700Bold
  })

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.number}>{props.number}</Text>


        <View style={{ flex: 1, marginLeft: 8 }}>
          {props.tVerse &&
            props.tVerse.lines
              .filter((l) => l?.toLowerCase().includes(props.searchText!))
              ?.map((l, i) => (
                <Text style={{ flexWrap: 'wrap', fontFamily: 'LibreCaslonText_400Regular', fontSize: 16 }} key={i}>
                  {l}
                </Text>
              ))}
          <View style={{ flex: 1, marginTop: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.text}>{props.text}</Text>
            <Text style={styles.music}>{props.music}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  up: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    width: Dimensions.get('window').width * 0.8,
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: 'rgb(255, 255, 255)'
  },
  music: {
    fontSize: 16,
    fontFamily: 'IMFellEnglish_400Regular_Italic'
  },
  text: {
    fontSize: 16,
    fontFamily: 'IMFellEnglish_400Regular_Italic'
  },
  number: {
    fontSize: 26,
    fontFamily: 'LibreCaslonText_700Bold'
  }
})

export default ListItem
