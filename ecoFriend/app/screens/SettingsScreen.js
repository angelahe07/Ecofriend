import { ScrollView, StyleSheet, Text, View, Image, Pressable, TouchableOpacity, Platform, TouchableHighlight, ActivityIndicator } from 'react-native'
import React, {useEffect, useState} from 'react'
import colors from '../config/colors'
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import LogoutButton from '../components/LogoutButton'

import * as ImagePicker from 'expo-image-picker'

export default function SettingsScreen({navigation}) {
   // used to get the username parameter from the home screen
   const route = useRoute();
   console.log(route)
   const { username } = route.params;
   const { name } = route.params;
   const { pass } = route.params;

    // Description: Access phone's images so user profile can be set
    // Link: https://medium.com/@sanchit0496/how-to-upload-files-from-device-in-react-native-6206b8cd7aff
    const [image, setImage] = useState(null);

    useEffect(() => {
      loadImageFromStorage();
      loadDateFromStorage();
      (async () => {
        if (Platform.OS !== 'web') { // specific to IOS phones
          const libraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync(); // upon first opening, asks for permission to access photos
          if (libraryStatus.status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
  
          const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
          if (cameraStatus.status !== 'granted') {
            alert('Sorry, we need camera permissions to make this work!');
          }
        }
        
      })();
      
    }, [dateCreated, name]);
    
    
    // When user chooses image as profile picture, the image is stored to AsyncStorage to each individual user
    // Description: Function to load image URI from AsyncStorage
    // Link: https://chat.openai.com/share/e10e911d-cbf9-4f31-ae11-8c762741060e 
    const loadImageFromStorage = async () => {
      try {
          const { name } = route.params;
          const storedImage = await AsyncStorage.getItem(`userImage_${name.toLowerCase()}`); // loads image from each individual user
          if (storedImage !== null) {
              setImage(storedImage);
          }
      } catch (error) {
          console.log('Error loading image from AsyncStorage:', error);
      }
    };
    // Description: saves image to AsyncStorage
    const saveImageToStorage = async (uri) => {
      try {
        const { name } = route.params;
        await AsyncStorage.setItem(`userImage_${name.toLowerCase()}`, uri); // saves image to each individual username
      } catch (error) {
          console.log('Error saving image to AsyncStorage:', error);
      }
   };

    const pickImage = async () => {
      
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // only images can be chosen - no videos or other forms of media
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      // Description: Check to make sure that result.assets is not empty so that the image is only set if the user chooses an image
      //              Fixes warning of a possible handling rejection error for when the user clicked on profile but then clicked cancel 
      //              and didn't change their profile picture
      // Link: https://chat.openai.com/share/7542b5dc-f474-432f-a897-5c61d8581dcc 
      if (!result.cancelled) {
        if (result.assets && result.assets.length > 0) {
          setImage(result.assets[0].uri);
          saveImageToStorage(result.assets[0].uri);
        } else {
          // Handle case where result.assets is empty (though it shouldn't be if not cancelled)
          console.log("No image assets returned.");
        }
      }
    };
    
    const [dateCreated, setDateCreated] = useState("");
    const loadDateFromStorage = async () => {
      try {
          const storedDate = await AsyncStorage.getItem(`userDate_${name.toLowerCase()}`); // loads date from each individual user
          console.log(storedDate);
          if (storedDate !== null) {
              setDateCreated(storedDate);
              console.log("date create: " + dateCreated)
          }else{
            console.log("date null")
          }
      } catch (error) {
          console.log('Error loading date from AsyncStorage:', error);
      }
    };

    

  return (
    <View style={styles.container}>
      <View style={styles.horizontalView}>
        <View style = {styles.textStyle}> 
          <Text style={styles.mainHeader}>⚙️ Settings</Text>
          <Text style={styles.text} marginTop = {30}>Name: {username}</Text>
          <Text style={styles.text}>Email: {name}</Text>
          <Text style={styles.text}>Password: {pass}</Text>
          <Text style={styles.text}>Member since: {dateCreated}</Text>
        </View>
        <TouchableOpacity style = {styles.touchable} onPress={() => pickImage()}>
        {image ? <Image source={{ uri: image }} style={styles.image} /> : <Text>Choose Image</Text>}
        </TouchableOpacity>
      </View>
      <View style = {styles.buttonContainer}>
          <LogoutButton></LogoutButton>
        </View>
    </View> 
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.tan,
    alignItems: "center",
  },
  mainHeader: {
    fontSize: 40,
    marginTop: 100,
    color: colors.darkGreen
  },
  text:{
    fontSize: 20,
    marginTop: 10,
    color: colors.darkGreen
  },
  horizontalView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    height: 40,
    width: 90,
    borderWidth: 2, 
    borderRadius: 10,
    marginTop: 90, 
    borderColor: colors.darkGreen,
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",

  },

  buttonContainer: {
    margin: 5,
    justifyContent: "center",
    alignItems: "center"
  },

  verticalView: {
    flexDirection: "column"
  },

  textStyle: {
    alignItems: "flex-start",
    flexWrap: "wrap",
    width: "50%",
  },

  touchable: {
    overlayColor: colors.greyblue,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: colors.darkGreen,
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 20,
  },

  image: {
    width: 116,
    height: 116,
    borderRadius: 58,
    borderColor: colors.darkGreen,
  },

})
