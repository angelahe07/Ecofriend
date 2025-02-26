import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign, Ionicons, Entypo } from '@expo/vector-icons/';

import AirQualityScreen from './app/screens/AirQualityScreen';
import CarbonFootPrint from './app/screens/CarbonFootPrint';
import HomeScreen from './app/screens/HomeScreen';
import SavedArticlesScreen from './app/screens/SavedArticlesScreen';
import SettingsScreen from './app/screens/SettingsScreen';
import MonthlyReport from './app/screens/MonthlyReport';
import SignInScreen from './app/screens/SignInScreen';
import SignUpScreen from './app/screens/SignUpScreen'
import ArticleScreen from './app/screens/ArticleScreen';
import colors from './app/config/colors';
import ReadByGenre from './app/screens/ReadByGenre';

import firebase from 'firebase/app';
import 'firebase/auth'; // If you're using authentication
import MainContainerNav from './app/screens/MainContainerNav';

const Stack = createStackNavigator();

export default function App() {
  return (
    // Description: Use stack navigation to get sign in screen to be separate from the tab navigator screens
    // Link: https://medium.com/@chathurangacpm/combining-stack-navigation-and-tab-navigation-in-react-native-a-step-by-step-guide-1346cf96ccd9 
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Sign In'>
        <Stack.Screen name = "MainContainerNav" component = {MainContainerNav} options={{headerShown: false}}/>
        <Stack.Screen name = "Sign In" component = {SignInScreen} options={{headerShown: false}} />
        <Stack.Screen name = "Sign Up" component = {SignUpScreen} options={{headerShown: false}}/>
      <Stack.Screen name = "Home screen" component = {HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name = "Article screen" component = {ArticleScreen} options={{headerShown: false}} />
        <Stack.Screen name = "Settings screen" component = {SettingsScreen} options={{headerShown: false}}/>
        <Stack.Screen name = "Saved articles" component = {SavedArticlesScreen} options={{headerShown: false}}/>
        <Stack.Screen name = "Read by genre" component = {ReadByGenre} options={{headerShown: false}}/>

      </Stack.Navigator>
    </NavigationContainer>
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