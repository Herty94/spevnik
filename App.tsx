import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import songs from './data/hymns.json'
import SongPage from './components/SongPage';
import { SongProps } from './types/types';
import { NavigationContainer, DefaultTheme, ParamListBase } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import SearchPage from './components/SearchPage';

const songArray = songs.hymnary.song as SongProps[]
const SongPageScreen = ({ route }: ParamListBase) => {
  const number = Number(route?.params?.number) || 0
  const song = songArray.find(s => s.number == number) || songArray[0]
  return <View style={styles.container}>
    <SongPage {...song} /></View>
}

const SearchPageScreen = () => {
  return < View style={styles.container} ><SearchPage /></View >
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



  return (
    <NavigationContainer theme={MyTheme} >
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Piesen') {
            iconName = 'itunes-note'

          } else if (route.name === 'Hladaj') {
            iconName = 'search'
          }

          // You can return any component that you like here!
          return <FontAwesome5 name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: '#f6f6f6',
        tabBarInactiveTintColor: 'rgb(173, 181, 220)',
      })}>
        <Tab.Screen name="Piesen" component={SongPageScreen} />
        <Tab.Screen name="Hladaj" component={SearchPageScreen} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
