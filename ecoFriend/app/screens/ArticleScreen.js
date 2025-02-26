import { StyleSheet, Text, View, Image} from 'react-native'
import React from 'react'
// import HomeScreen from './HomeScreen';
import { useNavigation, useRoute } from '@react-navigation/native';
import colors from '../config/colors';
import { WebView } from 'react-native-webview';



export default function SavedArticlesScreen() {
  const route = useRoute();
  const { url } = route.params;

return <WebView source={{ uri: url }} style={{ flex: 1 }} />;

}

const styles = StyleSheet.create({
  mainHeader: {
    fontSize: 30,
    marginLeft: 20,
    marginTop: 80,
  },
  author: {
    fontSize: 15,
    marginLeft: 20,
    marginTop: 30,
    color: colors.dark,
    fontWeight: "bold"

  },
  top: {
    height:20,
    backgroundColor: colors.tan,
    width: "100%s"
  },
  image:{
    height: 300,
    width: 400,
  },
  container:{
    justifyContent:"center",
    alignItems:"center"
  }
})