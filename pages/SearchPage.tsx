import { useNavigation, ParamListBase, NavigationProp } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { Dimensions, FlatList, Keyboard, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback } from 'react-native';
import { AppContext, songArray } from '../utils/Globals';
import {
  useFonts,
  LibreCaslonText_400Regular,
  LibreCaslonText_700Bold,
} from '@expo-google-fonts/libre-caslon-text';
import { SearchSong } from '../types/types';
import ListItem from '../components/ListItem';



type Props = {}

const SearchPage = (props: Props) => {


  let [fontsLoaded] = useFonts({
    LibreCaslonText_400Regular,
    LibreCaslonText_700Bold
  });


  const navigation = useNavigation<NavigationProp<ParamListBase>>()
  const context = useContext(AppContext)



  const [input, setInput] = useState<string>()
  const [data, setData] = useState<SearchSong[]>()

  const onChangeText = async (rawText: string) => {
    setInput(rawText)
    const text = rawText.toLowerCase()
    if (text.length === 0) return setData([]);
    if (text.length > 2) {
      let foundSongs = songArray.filter(s => s.text.toLowerCase().includes(text) || s.number.toString().includes(text) || s.music.toLowerCase().includes(text) || s.verses.some(v => v.lines.some(s => (s.toLowerCase().includes(text)))))
      let searchSongs = foundSongs.map(s => { return { ...s, tVerse: s.verses.find(v => v.lines.some(s => (s.toLowerCase().includes(text)))), searchText: text } }) as SearchSong[]
      if (searchSongs.length > 0) setData(searchSongs)
      else setData([])
    }
  }

  return fontsLoaded && (
    <><TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{ flex: 1, marginTop: 40, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.label}>Hľadaj slovo</Text>
        <TextInput style={styles.inputText} placeholder="slovo" value={input} onChangeText={onChangeText}></TextInput>
        <FlatList
          data={data}
          ListEmptyComponent={<>{input && input?.length >= 1 && < Text style={{ marginTop: 100, textAlign: 'center', fontFamily: 'LibreCaslonText_700Bold', color: 'rgb(61, 71, 122)', fontSize: 20 }}>{input.length < 3 ? "Pre vyhladávanie je nutné zadať aspoň 3 znaky" : "Pieseň sa nenašla"}</Text>}</>}
          renderItem={({ item, index }) =>
            <Pressable key={index} onPress={() => {
              if (context.setSongNumber) {
                context.setSongNumber(item.number)
                navigation.navigate("Song");
              }
            }}><ListItem {...item} /></Pressable>

          } />
      </SafeAreaView>
    </TouchableWithoutFeedback >
    </>
  )
}

const styles = StyleSheet.create({
  inputText: {
    width: Dimensions.get("window").width * 0.8,
    margin: 12,
    fontSize: 18,
    borderRadius: 8,
    fontFamily: 'LibreCaslonText_700Bold',
    textAlign: 'left',
    padding: 10,
    borderWidth: 4,
    borderColor: 'rgb(92, 105, 170)',
    backgroundColor: '#fff'
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  },
  label: {
    color: 'rgb(61, 71, 122)',
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'LibreCaslonText_400Regular',
  }
  ,
  out: {
    color: '#bf341c',
    fontSize: 16,
    fontWeight: '600',
  }
});

export default SearchPage