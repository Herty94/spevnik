import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, TextInput } from 'react-native';

type Props = {}

const SearchPage = (props: Props) => {
  const navigation = useNavigation()
  const [number, onChangeNumber] = React.useState('');
  return (
    <TextInput
      style={styles.input}
      onChangeText={onChangeNumber}
      value={number}
      placeholder="000"
      keyboardType="numeric"
      maxLength={3}
      onSubmitEditing={
        () => { navigation.navigate("Piesen", { number }); }
      }
    />
  )
}

const styles = StyleSheet.create({
  input: {
    width: 75,
    margin: 12,
    fontSize: 32,
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
  },
});

export default SearchPage