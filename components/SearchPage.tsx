import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useLayoutEffect, useRef } from 'react'
import { StyleSheet, Text, TextInput } from 'react-native';
import { AppContext } from '../App';

const LAST_SONG = 627

type Props = {}

const SearchPage = (props: Props) => {
  const navigation = useNavigation()
  const [number, onChangeNumber] = React.useState('');
  const inputRef = useRef(null)
  const context = useContext(AppContext)


  React.useEffect(() => {
    let timer: NodeJS.Timeout
    const unsubscribe = navigation.addListener('focus', () => {
      if (inputRef.current) {
        timer = setTimeout(() => inputRef.current.focus(), 100);
      }
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return () => {
      unsubscribe
      clearTimeout(timer);
    }
  }, [navigation]);

  return (
    <>
      <Text style={styles.label}>Číslo piesne</Text>
      <TextInput
        ref={inputRef}
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        onFocus={() => { onChangeNumber('') }}
        placeholder="000"
        keyboardType="numeric"
        maxLength={3}
        onSubmitEditing={
          () => {
            if (Number(number) <= LAST_SONG) context.setSongNumber(Number(number))
            navigation.navigate("Piesen");
          }
        }
      />
      {Number(number) > LAST_SONG && (<>< Text style={styles.out} >Číslo je mimo rozsah</Text>
        <Text style={{ color: '#bf341c' }}>posledná pieseň je {LAST_SONG}</Text ></>)}
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    width: 90,
    margin: 12,
    fontSize: 32,
    borderRadius: 8,
    borderWidth: 1,
    textAlign: 'center',
    padding: 10,
    borderWidth: 4,
    borderColor: 'rgb(92, 105, 170)',
    backgroundColor: '#fff'
  },
  label: {
    color: 'rgb(61, 71, 122)',
    fontSize: 16,
    fontWeight: '600'
  }
  ,
  out: {
    color: '#bf341c',
    fontSize: 16,
    fontWeight: '600',
  }
});

export default SearchPage