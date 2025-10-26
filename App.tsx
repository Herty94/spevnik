import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import SongPage from './pages/SongPage';
import { NavigationContainer, DefaultTheme, ParamListBase } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import SearchPage from './pages/SearchPage';
import React, { useEffect, useState } from 'react';
import { AppContext, songArray } from './utils/Globals';
import GoToPage from './pages/GoToPage';
import ContentPage from './pages/ContentPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const ContentPageScreen = () => {
  return < View style={styles.searchContainer} ><ContentPage /></View >
}

const SongPageScreen = ({ navigation, route }: ParamListBase) => {
  //const song = songArray.find(s => s.number == number) || songArray[0]
  return <View style={styles.songContainer}>
    <SongPage songs={songArray} /></View>
}

const SearchPageScreen = () => {
  return < View style={styles.searchContainer} ><SearchPage /></View >
}

const GotoPageScreen = () => {
  return < View style={styles.searchContainer} ><GoToPage /></View >
}

const Tab = createBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(245, 183, 194)',
    background: 'rgb(86, 103, 190)',
    card: 'rgb(75, 89, 161)',
    text: 'rgb(173, 181, 220)'
  },
};

export default function App() {
  const [songNumber, _setSongNumber] = useState(1);

  useEffect(() => {
    AsyncStorage.getItem('songNumber').then(value => { if (value) setSongNumber(Number(value)) })
  }, [])

  const setSongNumber = (value: React.SetStateAction<number>) => {
    console.log("Setting song number to", value);
    _setSongNumber(value);
    AsyncStorage.setItem('songNumber', value.toString()).then().catch(err => console.error("Error saving song number", err));
  }

  return (
    <AppContext.Provider value={{
      songNumber,
      setSongNumber
    }}><SafeAreaProvider>
        <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex:1}}>
      <NavigationContainer theme={MyTheme} >
        <Tab.Navigator initialRouteName='Song' screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Song') {
              iconName = 'book-open'
            } else if (route.name === 'Search') {
              iconName = 'search'
            }
            else if (route.name === 'Content') {
              iconName = 'list'
            }
            else {
              return <Octicons name='number' size={size} color={color} />
            }

            // You can return any component that you like here!
            return <FontAwesome5 name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: '#f6f6f6',
          tabBarShowLabel: true,
          tabBarInactiveTintColor: 'rgb(195, 203, 241)',

        })}>
          <Tab.Screen name="Content" options={{ title: "Obsah" }} component={ContentPageScreen} />
          <Tab.Screen name="Song" options={{ title: "Pieseň" }} component={SongPageScreen} />
          <Tab.Screen name="Search" options={{ title: "Hľadaj" }} component={SearchPageScreen} />
          <Tab.Screen name="Goto" options={{ title: "Číslo" }} component={GotoPageScreen} />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer >
      </KeyboardAvoidingView>
      </SafeAreaProvider>
    </AppContext.Provider >
  );
}

const styles = StyleSheet.create({
  songContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flex: 1,
    backgroundColor: 'rgb(173, 181, 220)',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
