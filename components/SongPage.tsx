import React from 'react'
import { SongProps } from '../types/types'
import { ScrollView, StyleSheet, Text } from 'react-native'
import Verse from './Verse'
import { imageSources } from '../assets/songs/imageSources'
import { Dimensions, Image } from 'react-native';


const SongPage = (props: SongProps) => {


  return (

    <ScrollView contentContainerStyle={styles.container} style={styles.scroll}>
      <Text style={styles.number}>{props.number}</Text>
      {imageSources[props.number].map((source, i) => {
        return <Image style={{ resizeMode: 'contain' }} key={i} source={source} onLoad={(event) => {
          let { height, width } = event.nativeEvent.source
          let ratio = Dimensions.get('window').width * 0.8 / width
          event.target.setNativeProps({ style: { height: height * ratio, width: width } })
        }} />
      }
      )
      }
      {props.verses && props.verses.filter(v => v.number !== 1).map((v, i) => <Verse key={i} {...v} />)}
      <Text>{props.music}</Text>
      <Text>{props.text}</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  scroll: {
    width: Dimensions.get("window").width,
  },
  number: {
    fontSize: 20,
    fontWeight: '700',

  }
}
);

export default SongPage