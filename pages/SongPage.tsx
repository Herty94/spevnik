import React, { useContext, useMemo, useState } from 'react'
import { SongProps } from '../types/types'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
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


const SongPage = ({ songs }: { songs: SongProps[] }) => {



  let [fL] = uF({ IMFellEnglish_400Regular_Italic })
  let [fontsLoaded] = useFonts({
    LibreCaslonText_400Regular,
    LibreCaslonText_400Regular_Italic,
    LibreCaslonText_700Bold,
  });


  const [fontFactor, setFontFactor] = useState<number>(0)

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

  const song = useMemo(() => {
    return songs.find((s) => s.number === context.songNumber) || songs[0]
  }, [context.songNumber])

  //TODO find 143 song

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

  // useEffect(() => { songArray.forEach(s => console.log(s.number)) }, [songArray])

  return fontsLoaded && (
    song && (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          style={styles.scroll}
        >
          <Text style={{ fontFamily: 'LibreCaslonText_700Bold', fontSize: 18, textAlign: 'center' }}>{title}</Text>
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
            <Text style={{ ...styles.music, paddingRight: 16 }}>
              {song.music}
            </Text>
          </View>
          {ratio <= 1 ? (
            <>
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
              })}
              <View style={styles.verseContainer}>
                {song.verses && song.verses.length > 1 ? (
                  song.verses
                    .slice(1)
                    .map((v, i) => (
                      <Verse key={i} {...v} fontSize={fontFactor} />
                    ))
                ) : (
                  <></>
                )}
              </View>
            </>
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
          )}
          <Text style={styles.music}>{song.text}</Text>
        </ScrollView>
        <BottomMenu
          songNumber={song.number}
          onFontSizeChangeUp={onFontChange}
        />
      </View>
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
    padding: 10,
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
    paddingTop: 18,
    fontSize: 16,
    fontFamily: 'IMFellEnglish_400Regular_Italic'
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
})

export default SongPage
