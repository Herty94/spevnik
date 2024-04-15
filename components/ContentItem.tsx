import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import {
  useFonts,
  LibreCaslonText_400Regular,
  LibreCaslonText_700Bold
} from '@expo-google-fonts/libre-caslon-text'

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
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <View style={{ flex: 1, marginBottom: 6 }}>
            <Text style={styles.text}>{props.name}</Text>
          </View>
          <View style={{ backgroundColor: 'black', height: 1 }}></View>
          <View
            style={{
              marginTop: 6,
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Text style={styles.number}>{props.begin}</Text>
            <Text style={styles.number}>-</Text>
            <Text style={styles.number}>{props.end}</Text>
          </View>
        </View>
      </View>
    )
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.8,
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginBottom: 8,
    borderRadius: 8
  },
  text: {
    flexWrap: 'wrap',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'LibreCaslonText_700Bold'
  },
  number: {
    fontSize: 26,
    fontFamily: 'LibreCaslonText_700Bold'
  }
})

export default ContentItem
