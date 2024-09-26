import { View, Text, FlatList, Pressable, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext, NUMBER_F_SIZE, contentArray } from '../utils/Globals'
import { ContentType } from '../types/types'
import ContentItem from '../components/ContentItem'
import {
  NavigationProp,
  ParamListBase,
  useNavigation
} from '@react-navigation/native'
import {
  useFonts,
  LibreCaslonText_700Bold
} from '@expo-google-fonts/libre-caslon-text'

type Props = {}

const ContentPage = (props: Props) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>()
  const context = useContext(AppContext)
  const [section, setSection] = useState<ContentType>()
  let [fontsLoaded] = useFonts({
    LibreCaslonText_700Bold
  })

  useEffect(() => {
    if (context.songNumber) {
      var sect = contentArray.find(
        (s) => s.begin <= context.songNumber! && s.end >= context.songNumber!
      )
      var subsec = sect?.section?.find(
        (s) => s.begin <= context.songNumber! && s.end >= context.songNumber!
      )
      setSection(subsec || sect)
    }
  }, [context.songNumber])

  return (
    <View style={{ paddingTop: 40 }}>
      <FlatList
        data={contentArray}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => {
              if (context.setSongNumber && !item.section) {
                context.setSongNumber(item.begin)
                navigation.navigate('Song')
              } else if (section === item) setSection(undefined)
              else setSection(item)
            }}
            key={index}
          >
            <>
              <ContentItem {...item} selected={item.name === section?.name} />
              {item.section &&
                (item.name === section?.name ||
                  item.section.some((s) => s.name === section?.name)) && (
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View
                      style={{
                        margin: 6,
                        width: 4,
                        borderRadius: 4,
                        backgroundColor: 'rgb(129, 137, 180)'
                      }}
                    ></View>
                    <FlatList
                      style={{ marginLeft: 6 }}
                      data={item.section}
                      renderItem={({ item, index }) => (
                        <Pressable
                          onPress={() => {
                            if (context.setSongNumber)
                              context.setSongNumber(item.begin)
                            navigation.navigate('Song')
                          }}
                          key={index}
                        >
                          <ContentItem
                            {...item}
                            selected={item.name === section?.name}
                            level={1}
                          />
                        </Pressable>
                      )}
                    />
                  </View>
                )}
            </>
          </Pressable>
        )}
      />
    </View>
  )
}

export default ContentPage
