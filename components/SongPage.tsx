import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { SongProps } from '../types/types'
import { ImageProps, ScrollView, StyleSheet, Text, View } from 'react-native'
import Verse from './Verse'
import { imageSources } from '../assets/songs/imageSources'
import { Dimensions, Image } from 'react-native'
import AppContext from '../utils/AppContext'
import { Button, Icon } from 'react-native-elements'


export const NUMBER_F_SIZE = 30
export const LAST_SONG = 627


const SongPage = ({ songs }: { songs: SongProps[] }) => {

  const [fontFactor, setFontFactor] = useState<number>(0)



  const context = useContext(AppContext);

  const ratio = useMemo(() => { return 0.8 + fontFactor * 0.05 }, [fontFactor])

  const song = useMemo(() => {
    return songs.find((s) => s.number === context.songNumber) || songs[0]
  }, [context.songNumber])

  //TODO find 143 song

  const images = imageSources[song.number].map((im) => {
    let { height, width } = Image.resolveAssetSource(im)
    return { height, width }
  })

  // useEffect(() => { songArray.forEach(s => console.log(s.number)) }, [songArray])

  return song && (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scroll} >
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: Dimensions.get('window').width, paddingHorizontal: 16 }}>
          <Text style={{ ...styles.number, fontSize: NUMBER_F_SIZE + fontFactor }}>{song.number}</Text>
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.music}>{song.music}</Text>
            <Text>{song.text}</Text>
          </View>
        </View>
        {ratio <= 1 ?
          imageSources[song.number].map((source, i) => {
            let { height, width } = images[i]

            return <Image style={{ resizeMode: 'contain', height: height * (Dimensions.get('window').width * ratio / width), width: width }} key={i} source={source} />
          }
          ) : <Verse {...song.verses[0]} fontSize={fontFactor}></Verse>
        }
        {song.verses && song.verses.length > 1 ? song.verses.slice(1).map((v, i) => <Verse key={i} {...v} fontSize={fontFactor} />) : <></>}
      </ScrollView >
      <View style={styles.songPager}>
        <Button buttonStyle={styles.arrowButton} onPress={() => { if (context.setSongNumber) context.setSongNumber(current => current = (LAST_SONG + current - 2) % LAST_SONG + 1) }} icon={<Icon size={28} name="chevron-left" type="font-awesome-5" color="white" />} />
        <Text style={{ fontSize: 18, color: 'white' }} >Pieseň č. {song.number}</Text>
        <Button buttonStyle={styles.arrowButton} onPress={() => { if (context.setSongNumber) context.setSongNumber(current => current = (current % LAST_SONG + 1)) }} icon={<Icon size={28} name='chevron-right' color="white" type='font-awesome-5' />}></Button>
        <Button buttonStyle={{ ...styles.arrowButton, marginLeft: 20 }} onPress={() => {
          setFontFactor(current => {
            if (current - 1 > -10) return current - 1
            else return current
          })
        }} icon={<Icon size={16} name='font' color="white" type='font-awesome-5' />}></Button>
        <Button buttonStyle={styles.arrowButton} onPress={() => { setFontFactor(current => current + 1) }} icon={<Icon size={28} name='font' color="white" type='font-awesome-5' />}></Button>
      </View>
    </View >
  )



}

const styles = StyleSheet.create({
  pageView: {
    flex: 1,
    width: Dimensions.get("window").width,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    width: Dimensions.get("window").width
  }
  ,
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 30,
    paddingTop: 30
  },
  scroll: {
    width: Dimensions.get("window").width,
  },
  number: {
    fontWeight: '800',
    padding: 10,
  },
  music: {
    paddingTop: 10,
    fontStyle: 'italic',
  },
  songPager: {
    marginBottom: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 100,
    backgroundColor: 'rgb(75, 89, 161)'
  },
  arrowButton: {
    marginHorizontal: 5,
    borderRadius: 100,
    width: 'auto',
    backgroundColor: 'transparent'
  }
}
);

export default SongPage