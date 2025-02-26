import { StyleSheet, Text, TextInput, View, Keyboard, TouchableHighlight, TouchableWithoutFeedback } from 'react-native'
import React, {useState, useEffect} from "react";
import colors from '../config/colors'
import Constants from 'expo-constants';
import {NavigationContainer} from '@react-navigation/native';
import {auth, db} from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function SignInScreen({navigation}) {
  
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPass] = useState("");
  const [dateCreate, setDateCreate] = useState("");

  class SignUpScreen extends React.Component{
    constructor(props){
      super(props);  
      this.state = {  
          id: userEmail.substring(0,userEmail.length-10),  
      };
    }
  }
  const handleInvalidInput = (error) => {
    //Description: To check if the error passed is the email-already-in-use email so that user can be 
    //             alerted to use a different email
    //Link: https://chat.openai.com/share/6e84b4f6-090f-48d8-a686-1eba277edcb1
    if(error.code == "auth/email-already-in-use"){
      alert("Please choose another email. This email has already been used.")
    }else{
      alert("Please input a valid email and/or password (6 characters or more)");
    }
  }

  const getSignedUpDate = () => {
      const today = new Date();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      const date = today.getDate();
      setDateCreate( `${month}-${date}-${year}`);
      console.log(dateCreate)
  }
  const onSignUpPress = async () => {
    //Description: Trying to implement Firebase authentication using handleSignIn function
    //Link: https://chat.openai.com/share/3b655915-9847-4f46-ad4e-099b0adaa507
    try {
      await createUserWithEmailAndPassword(auth, userEmail.trim(), userPassword.trim()); // Pass userEmail and userPassword
      saveDate();
      //Description: Nesting Navigators - allows Navigator to access Home screen through MainContainerNav
      //Link: https://reactnavigation.org/docs/nesting-navigators/#navigating-to-a-screen-in-a-nested-navigator
      navigation.navigate("MainContainerNav", {screen: "Home", params: { name: userEmail, pass: userPassword, date: dateCreate }}); // Navigate to Home screen after successful sign up
    } catch (error) {
      handleInvalidInput(error);
      console.log("Error signing up:", error);
    }

  }

  //const [dateAccountCreated, setDateCreated] = useState("");

  useEffect(() => {
    getSignedUpDate();
    //console.log("Date created: " + dateCreate);
  }, [dateCreate]);
  
  // Description: saves date to AsyncStorage
  const saveDate = async () => {
    try {
      getSignedUpDate();
      // Convert date object to string
      //const date = dateCreate; // Or you can use any other date format suitable for your needs
    
      // Store the date string in AsyncStorage
      await AsyncStorage.setItem(`userDate_${userEmail.toLowerCase()}`, dateCreate);
      console.log("Date created: " + dateCreate)
      console.log('Date stored successfully!');
    } catch (error) {
      console.error('Error storing date:', error);
    }
  };
 
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style = {styles.textTitle}>Sign Up</Text>
        <View style={styles.userInputRow}>
          <Text>Email:</Text>
          <TextInput 
            style={styles.userInputBox} 
            // Description: getting user input from textInput and setting it as state variable
            // Link: https://reactnative.dev/docs/handling-text-input 
            onChangeText={text => setEmail(text)}
            marginLeft = {40}
          />
        </View>
        <View style = {styles.userInputRow}>
          <Text>Password:</Text>
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
            onPress={onSignUpPress}
            underlayColor={colors.green}
          >
            <Text>Sign Up</Text>
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
    //alignItems: "flex-start",
    justifyContent: 'center',
  },

  userInputBox:{
    width: 200,
    height: 30,
    borderRadius: 10,
    backgroundColor: colors.darkTan,
    margin: 20,
    padding: 5,
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
    fontSize: 10,
  }
})