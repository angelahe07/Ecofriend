import React from 'react';
import { Button, StyleSheet, TouchableHighlight, Text } from 'react-native';
import firebase from 'firebase/app';
//import 'firebase/auth';
//import SignInScreen from '../screens/SignInScreen';
import {auth} from '../config/firebase';
import colors from '../config/colors';
import { useNavigation } from '@react-navigation/native';

// Description: Logout user when button is clicked using firebase
// Link: https://chat.openai.com/share/450a4456-4415-4850-b8ce-2da457e8ebaa 
const LogoutButton = () => {
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigation.navigate("Sign In")
            console.log('User signed out successfully');
        } catch (error) {
            console.error('Logout Error:', error);
        }
    };

  return (
    <TouchableHighlight style = {styles.button}
      //title="Logout"
      onPress={handleLogout}
      underlayColor={colors.green}>
        <Text style={styles.text}>Logout</Text>
      </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
    button: {
      height: 50,
      width: 100, 
      backgroundColor: colors.darkTan,
      borderRadius: 10, 
      justifyContent: "center",
      alignItems: "center",
      margin: 20,
    },
    text: {
        fontSize: 18, 
        color: colors.darkGreen
    }
  });
export default LogoutButton;


