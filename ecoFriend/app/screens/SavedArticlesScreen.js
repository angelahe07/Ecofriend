import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import colors from '../config/colors';

// not a screen in app anymore 
export default function SavedArticlesScreen() {
  const route = useRoute();

  return (
    <View style={styles.container}>
      <Text style={styles.mainHeader}>Saved Articles</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: colors.tan,
  },
  mainHeader: {
    fontSize: 40,
    marginLeft: 20,
    marginTop: 40,
  },
})