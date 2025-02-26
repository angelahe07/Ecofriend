import { StyleSheet, Text, TextInput, View, Keyboard, TouchableHighlight, TouchableWithoutFeedback } from 'react-native'
import colors from '../config/colors'
import Constants from 'expo-constants';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { onLog } from 'firebase/app';
import React, { useEffect, useState } from 'react';
import {addUser, auth, db, fetchData} from '../config/firebase';
import { signInWithEmailAndPassword} from 'firebase/auth';

 

export default function SignInScreen() {
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPass] = useState("");
  const [userUID, setUser] = useState("")
  const navigation = useNavigation();
  const handleInvalidInput = () => {
    alert("Please input a valid email and/or password (6 characters or more)");
  }
  //Description: Trying to implement Firebase authentication using handleSignIn function
  //Link: https://chat.openai.com/share/3b655915-9847-4f46-ad4e-099b0adaa507
  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, userEmail.trim(), userPassword.trim()); // Pass userEmail and userPassword
      fetchData();
      navigation.navigate("MainContainerNav", { screen: "Home", params: { name: userEmail, pass: userPassword} }); // Navigate to home screen after successful sign in
    } catch (error) {
      handleInvalidInput();
      console.log("Error logging in:", error);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style = {styles.textTitle}>Log In</Text>
        <View style={styles.userInputRow}>
          <Text style={styles.text}>Email:</Text>
          <TextInput 
            style={styles.userInputBox} 
            // Description: getting user input from textInput and setting it as state variable
            // Link: https://reactnative.dev/docs/handling-text-input 
            onChangeText={text => setEmail(text)}
            marginLeft = {40}
          />
        </View>
        <View style = {styles.userInputRow}>
          <Text style={styles.text}>Password:</Text>
          <TextInput 
            style={styles.userInputBox} 
            // Description: getting user input from textInput and setting it as state variable
            // Link: https://reactnative.dev/docs/handling-text-input 
            onChangeText={text => setPass(text)}
            marginLeft = {13}
          />
        </View>

        <View style = {styles.buttonContainer}>
          <TouchableHighlight
            style={styles.button}
            onPress={handleSignIn}
            underlayColor={colors.green}
          >
            <Text>Log In</Text>
          </TouchableHighlight>
        </View>

        <View style = {styles.textContainer}>
          <TouchableHighlight 
            onPress = {() => navigation.navigate("Sign Up")}
            underlayColor={colors.green}
          >
            <Text>Don't have a login? Sign Up</Text>
          </TouchableHighlight>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.tan,
    justifyContent: 'center',
  },

  userInputBox:{
    width: 200,
    height: 30,
    borderRadius: 10,
    backgroundColor: colors.darkTan,
    margin: 20,
    padding: 6,
    fontSize: 20,
  },

  userInputRow:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: 50
  },

  buttonContainer: {
    marginTop: 20,
    //alignItems: "center",
    justifyContent: "center",
    marginLeft: 150
  },

  button: {
    width: 80,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 10,
    overlayColor: colors.tan,
    backgroundColor: colors.darkTan,
  },

  textTitle: {
    fontSize: 36,
    marginLeft: 50,
    marginBottom: 20,
  }, 

  textContainer: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  text:{
    fontSize: 16,
  }
})