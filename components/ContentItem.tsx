import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import {
  useFonts,
  LibreCaslonText_400Regular,
  LibreCaslonText_700Bold
} from '@expo-google-fonts/libre-caslon-text'
import { FontAwesome5 } from '@expo/vector-icons';

import { ContentType } from '../types/types'

const ContentItem = (props: ContentType & { selected?: boolean, level?: number }) => {
  let [fontsLoaded] = useFonts({
    LibreCaslonText_400Regular,
    LibreCaslonText_700Bold
  })

  return (
    fontsLoaded && (
      <View
        style={{
          ...styles.container,
          width: props.level ? Dimensions.get('window').width * 0.744 : Dimensions.get('window').width * 0.8,
          backgroundColor: props.selected ? 'white' : 'rgb(219, 223, 245)'
        }}
      >
        <View >
          <Text style={styles.text}>{props.name}</Text>
        </View>
        {props.section && props.section.length >= 0 && <View style={{ borderRadius: 10 }}><FontAwesome5 name={props.selected ? "angle-up" : "angle-down"} size={20} color="white" /></View>}
        {/* <View style={{ flex: 1j, flexDirection: "column", borderWidth: 4 }}>
          <Text style={styles.number}>{props.begin}</Text>
          <Text style={styles.number}>{props.end}</Text>
        </View> */}

      </View >
    )
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.8,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 8,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  text: {
    flexWrap: 'wrap',
    textAlign: 'left',
    fontSize: 16,
    fontFamily: 'LibreCaslonText_700Bold'
  },
  number: {
    fontSize: 26,
    fontFamily: 'LibreCaslonText_700Bold'
  }
})

export default ContentItem
