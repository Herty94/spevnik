import { useNavigation, ParamListBase, NavigationProp } from '@react-navigation/native';
import React, { useContext, useRef, useState } from 'react';
import { Dimensions, FlatList, Keyboard, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback } from 'react-native';
import { AppContext, LAST_SONG, songArray } from '../utils/Globals';
import {
  useFonts,
  LibreCaslonText_400Regular,
  LibreCaslonText_700Bold,
} from '@expo-google-fonts/libre-caslon-text';
import { SearchSong, SongProps } from '../types/types';
import ListItem from '../components/ListItem';



type Props = {}

const GoToPage = (props: Props) => {


  let [fontsLoaded] = useFonts({
    LibreCaslonText_400Regular,
    LibreCaslonText_700Bold
  });


  const navigation = useNavigation<NavigationProp<ParamListBase>>()
  const [number, onChangeNumber] = React.useState('');
  const inputRef = useRef<TextInput>(null)
  const context = useContext(AppContext)


  React.useEffect(() => {
    let timer: NodeJS.Timeout
    if (context.songNumber)
      onChangeNumber(context.songNumber.toString());
    const unsubscribe = navigation.addListener('focus', () => {
      if (inputRef.current) {
        timer = setTimeout(() => inputRef.current!.focus(), 300);
      }
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return () => {
      unsubscribe
      clearTimeout(timer);
    }
  }, [navigation]);



  return fontsLoaded && (
    <>
      <Text style={styles.label}>Číslo piesne</Text>
      <TextInput
        ref={inputRef}
        style={styles.inputNum}
        onChangeText={onChangeNumber}
        value={number}
        selectTextOnFocus
        placeholder="000"
        keyboardType="numeric"
        maxLength={3}
        onSubmitEditing={
          () => {
            if (Number(number) <= LAST_SONG && context.setSongNumber) context.setSongNumber(Number(number))
            navigation.navigate("Song");
          }
        }
      />
      {Number(number) > LAST_SONG && (<>< Text style={styles.out} >Číslo je mimo rozsah</Text>
        <Text style={{ color: '#bf341c' }}>posledná pieseň je {LAST_SONG}</Text ></>)}
    </>
  )
}

const styles = StyleSheet.create({
  inputNum: {
    width: 90,
    margin: 12,
    fontSize: 32,
    borderRadius: 8,
    fontFamily: 'LibreCaslonText_700Bold',
    textAlign: 'center',
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

export default GoToPage