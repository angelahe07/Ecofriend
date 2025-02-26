import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AirQualityScreen from './AirQualityScreen';
import CarbonFootPrint from './CarbonFootPrint';
import HomeScreen from './HomeScreen';
import MonthlyReport from './MonthlyReport';
import colors from '../config/colors';
import { AntDesign, Ionicons, Entypo } from '@expo/vector-icons/';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

// Description: Create TabNavigator component that is directly used in Navigation Container so that 
// Stack Navigator and Tab Navigator can each have their own component and be added toegther
// Link: https://chat.openai.com/share/2f12dd8a-fef1-4b19-b553-fec516cae0f6
// Additional Help was from Mrs. Denna - create new js file instead of keeping it all in the App.js

export default function MainContainerNav() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            initialRouteName='Home'
                screenOptions={({route }) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    // this will specific which icon to use for each tab
                    // the outline is the 'empty' one for when its NOT selected
                    if (route.name ==='Home') {
                        return <Ionicons name="home" size={24} color="green"/>
                    }
                    else if (route.name === 'Air Quality') {
                        return <Entypo name="air" size={22} color="green"/>
                    }
                    else if (route.name === 'Carbon Footprint') {
                        return <Ionicons name="footsteps" size={22} color ="green"/>
                    }else if (route.name === 'Carbon Footprint Trend') {
                        return <Ionicons name="notifications-outline" size={22} color="green"/>
                    }
                },
                tabBarActiveTintColor: colors.green,
                tabBarInactiveTintColor: 'grey',
                })}
            >
                <Tab.Screen name='Home' component={HomeScreen} />
                <Tab.Screen name='Air Quality' component={AirQualityScreen} />
                <Tab.Screen name='Carbon Footprint' component={CarbonFootPrint} />
                <Tab.Screen name='Carbon Footprint Trend' component={MonthlyReport} />
        </Tab.Navigator>
    )
}  