import React, { useContext, useMemo } from 'react'
import { SongProps } from '../types/types'
import { ScrollView, StyleSheet, Text } from 'react-native'
import Verse from './Verse'
import { imageSources } from '../assets/songs/imageSources'
import { Dimensions, Image } from 'react-native';
import Swiper from 'react-native-swiper'
import { AppContext } from '../App'


const SongPage = ({ songs }: { songs: SongProps[] }) => {

  const context = useContext(AppContext);

  const { songNumber: number } = context

  const song = useMemo((
  ) => {
    let s = songs.find(s => s.number === number)
    return s
  }, [number])

  return song && (
    <ScrollView contentContainerStyle={styles.container} style={styles.scroll}>

      <Text style={styles.number}>{song.number}</Text>
      {imageSources[song.number].map((source, i) => {
        return <Image style={{ resizeMode: 'contain' }} key={i} source={source} onLoad={(event) => {
          let { height, width } = event.nativeEvent.source
          let ratio = Dimensions.get('window').width * 0.8 / width
          event.target.setNativeProps({ style: { height: height * ratio, width: width } })
        }} />
      }
      )
      }
      {song.verses && song.verses.length > 1 ? song.verses.map((v, i) => <Verse key={i} {...v} />) : <></>}
      <Text style={styles.music}>{song.music}</Text>
      <Text>{song.text}</Text>
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
    fontSize: 30,
    fontWeight: '800',
    padding: 10,
  },
  music: {
    paddingTop: 10,
    fontStyle: 'italic',
  }
}
);

export default SongPage