import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { SongProps } from '../types/types'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Verse from '../components/Verse'
import { imageSources } from '../assets/songs/imageSources'
import { Dimensions, Image } from 'react-native'
import { useFonts as uF, IMFellEnglish_400Regular_Italic } from '@expo-google-fonts/im-fell-english'
import BottomMenu from '../components/BottomMenu'
import { AppContext, NUMBER_F_SIZE, contentArray } from '../utils/Globals'
import {
  useFonts,
  LibreCaslonText_400Regular,
  LibreCaslonText_400Regular_Italic,
  LibreCaslonText_700Bold,
} from '@expo-google-fonts/libre-caslon-text';
import { useKeepAwake } from 'expo-keep-awake'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import Constants from 'expo-constants';



// Use a plain URI for remote audio (do NOT use require() with remote URLs)
const SongPage = ({ songs }: { songs: SongProps[] }) => {

  useKeepAwake();

  let [fL] = uF({ IMFellEnglish_400Regular_Italic })
  let [fontsLoaded] = useFonts({
    LibreCaslonText_400Regular,
    LibreCaslonText_400Regular_Italic,
    LibreCaslonText_700Bold,
  });

  const scrollRef = useRef<ScrollView>(null);

  const [fontFactor, setFontFactor] = useState<number>(0)

  useEffect(() => {
    AsyncStorage.getItem('fontFactor').then(value => {
      if (value) setFontFactor(Number(value))
    })
  }, [])

  useEffect(() => {
    AsyncStorage.setItem('fontFactor', fontFactor.toString()).then().catch(err => console.error("Error saving font factor", err));
  }, [fontFactor])

  const context = useContext(AppContext)

  const ratio = useMemo(() => {
    return 0.8 + fontFactor * 0.05
  }, [fontFactor])

  const title = useMemo(() => {
    if (context.songNumber) {
      var sect = contentArray.find(
        (s) => s.begin <= context.songNumber! && s.end >= context.songNumber!
      )
      var subsec = sect?.section?.find(
        (s) => s.begin <= context.songNumber! && s.end >= context.songNumber!
      )
      return subsec?.name || sect?.name
    }
  }, [context.songNumber])

  const song = useMemo(
    () => songs.find(s => s.number === context.songNumber) ?? songs[0],
    [context.songNumber, songs]
  )

  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0 })
  }, [song?.number])

  const audioSource = song
    ? `https://www.remidia.sk/mp3/${String(song.number).padStart(3, '0')}.mp3`
    : null

  const images = imageSources[song.number].map((im) => {
    let { height, width } = Image.resolveAssetSource(im)
    return { height, width }
  })

  const onFontChange = (up: boolean) => {
    if (up) setFontFactor((current) => current + 1)
    else
      setFontFactor((current) => {
        if (current - 1 > -10) return current - 1
        else return current
      })
  }

  const player = useAudioPlayer(audioSource ?? null)
  const status = useAudioPlayerStatus(player)

  // useEffect(() => { songArray.forEach(s => console.log(s.number)) }, [songArray])

  return fontsLoaded && (
    song && (
      <View style={styles.container}>
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.scrollContainer}
          style={styles.scroll}
        >

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: Dimensions.get('window').width,
              paddingHorizontal: 16
            }}
          >

            <Text
              style={{ ...styles.number, fontSize: NUMBER_F_SIZE }}
            >
              {song.number}
            </Text>
            <Text style={{ ...styles.music, paddingRight: 16, paddingTop: 42 }}>
              {song.music}
            </Text>
          </View>
          {ratio <= 1 ? (
            <View style={{ flex: 1, alignItems: 'center' }}>
              <View style={{ marginBottom: 28 }} >
                {imageSources[song.number].map((source, i) => {
                  let { height, width } = images[i]

                  return (
                    <Image
                      style={{
                        resizeMode: 'contain',
                        height:
                          height *
                          ((Dimensions.get('window').width * ratio) / width),
                        width: width
                      }}
                      key={i}
                      source={source}
                    />
                  )
                })}</View>
              <View style={styles.verseContainer}>
                {song.verses && song.verses.length > 1 ? (
                  song.verses
                    .slice(1)
                    .map((v, i) => (
                      <Verse key={i} {...v} fontSize={fontFactor} />
                    ))
                ) : (
                  <View></View>
                )}
              </View>
            </View>
          ) : (
            <View style={styles.verseContainer}>
              {song.verses && song.verses.length > 1 ? (
                song.verses.map((v, i) => (
                  <Verse key={i} {...v} fontSize={fontFactor} />
                ))
              ) : (
                <Verse {...song.verses[0]} fontSize={fontFactor} />
              )}
            </View>
          )
          }
          <View style={{
            flex: 1, flexDirection: 'row-reverse', width: Dimensions.get("window").width * 0.8,
          }} ><Text style={styles.music}>{song.text}</Text></View>

          <Text style={{ fontFamily: 'LibreCaslonText_700Bold', fontSize: 18, opacity: 0.4, textAlign: 'center', marginTop: 100 }}>{title}</Text>
        </ScrollView >
        <BottomMenu
          songNumber={song.number}
          onFontSizeChangeUp={onFontChange}
        />
        <Button
          onPress={() => {
            if (status?.playing) player?.pause()
            else player?.play()
          }}
          disabled={!audioSource}
          containerStyle={styles.fabContainer}
          buttonStyle={styles.fabButton}
          disabledStyle={styles.fabDisabled}
          icon={<MaterialIcons name={status?.playing ? 'pause' : 'play-arrow'} size={28} color="#fff" />}
        />
      </View >
    )
  )
}

const styles = StyleSheet.create({
  pageView: {
    flex: 1,
    width: Dimensions.get('window').width
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    width: Dimensions.get('window').width
  },
  verseContainer: {
    flex: 1,
    marginHorizontal: 20,
    alignItems: 'flex-start'
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 30,
    paddingTop: 45
  },
  scroll: {
    width: Dimensions.get('window').width
  },
  number: {
    padding: 10,
    fontFamily: 'LibreCaslonText_700Bold'
  },
  music: {
    fontSize: 16,
    fontFamily: 'IMFellEnglish_400Regular_Italic',
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
  ,
  fabContainer: {
    position: 'absolute',
    top: Constants.statusBarHeight,
    right: 16,
    width: 52,
    height: 52,
    borderRadius: 26,
    zIndex: 999,
    elevation: 12,
  },
  fabButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgb(75, 89, 161)',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabDisabled: {
    opacity: 0.4,
  }
})

export default SongPage
