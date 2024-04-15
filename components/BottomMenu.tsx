import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { AppContext, LAST_SONG } from '../utils/Globals';
import {
  useFonts,
  LibreCaslonText_400Regular,
} from '@expo-google-fonts/libre-caslon-text';


type Props = {
  songNumber: number;
  onFontSizeChangeUp: (value: boolean) => void;
}

export default function BottomMenu(props: Props) {

  let [fontsLoaded] = useFonts({
    LibreCaslonText_400Regular,
  });

  const context = useContext(AppContext)

  return (
    <View style={styles.songPager}>
      <Button
        buttonStyle={styles.arrowButton}
        onPress={() => {
          if (context.setSongNumber)
            context.setSongNumber(
              (current) =>
                (current = ((LAST_SONG + current - 2) % LAST_SONG) + 1)
            )
        }}
        icon={
          <Icon
            size={28}
            name="chevron-left"
            type="font-awesome-5"
            color="white"
          />
        }
      />
      <Text style={{ fontSize: 18, color: 'white', fontFamily: 'LibreCaslonText_400Regular', }}>
        Pieseň č. {props.songNumber}
      </Text>
      <Button
        buttonStyle={styles.arrowButton}
        onPress={() => {
          if (context.setSongNumber)
            context.setSongNumber(
              (current) => (current = (current % LAST_SONG) + 1)
            )
        }}
        icon={
          <Icon
            size={28}
            name="chevron-right"
            color="white"
            type="font-awesome-5"
          />
        }
      ></Button>
      <Button
        buttonStyle={{ ...styles.arrowButton, marginLeft: 20 }}
        onPress={() => {
          props.onFontSizeChangeUp(false)
        }}
        icon={
          <Icon
            size={28}
            name="minus"
            color="white"
            type="font-awesome-5"
          />
        }
      ></Button>
      <Button
        buttonStyle={styles.arrowButton}
        onPress={() => {
          props.onFontSizeChangeUp(true)
        }}
        icon={
          <Icon size={28} name="plus" color="white" type="font-awesome-5" />
        }
      ></Button>
    </View>
  )
}
const styles = StyleSheet.create({
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