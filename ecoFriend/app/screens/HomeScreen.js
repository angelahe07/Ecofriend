import { StyleSheet, View, ScrollView, ImageBackground, Image, TouchableHighlight, ObjectRow } from 'react-native'
import { Avatar, Button, Card, Text } from "react-native-paper";
import { useNavigation, useRoute } from '@react-navigation/native';
import Constants from 'expo-constants';
import React, { useEffect, useState } from 'react'
import { commonStyles } from '../config/styles'
const LeftContent = (props) => <Avatar.Icon {...props} icon="map" />;
import { AntDesign } from '@expo/vector-icons/';
import colors from '../config/colors'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'



export default function HomeScreen() {
  const [articles, setArticles] = useState([]);
  const navigation = useNavigation();

  const route = useRoute();
  const { name } = route.params;
  const { pass } = route.params;
  const username = name.substring(0, name.indexOf('@'));  // Assuming the email is in the format "username@example.com"
  const { date } = route.params;
  
  const [imageUri, setImageUri] = useState(null);


  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate() - 1;
    return `${month}-${date}-${year}`;

  }
  
  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            from: getDate(),
            q: 'environmental', // Changed from 'category' to 'q'
            sortBy: 'popularity',
            apiKey: '452dc3bb747c47179df23ad0f525d63b'
          }
        });

        const articlesData = response.data.articles;
        setHeartStates(Array(articlesData.length).fill(false));
        setArticles(articlesData);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    }
    const loadImageUri = async () => {
      try {
        const uri = await AsyncStorage.getItem(`userImage_${name.toLowerCase()}`);
        console.log("uri: " + uri)
        if (uri !== null) {
          setImageUri(uri);
          //console.log(imageUri)
        }
      } catch (error) {
        console.error('Error loading image URI:', error);
      }

      // Description: Allows image in home screen to reflect change made in settings
      // Link: https://chat.openai.com/share/3cd63f40-987c-45fe-aca8-0f1ebf106456 
      const unsubscribe = navigation.addListener('focus', loadImageUri); // Call the function whenever the Home Screen is focused
      //loadImageUri(); // Call initially when component mounts
    }  
    loadImageUri();
    fetchNews();
  }, [route.params, name, imageUri, navigation]);

  // Function to get a specific article by its index
  const [heartStates, setHeartStates] = useState([]);

  // for second row of articles, have to add 2 to the indices because the slice in the map causes the second row of articles to start and index 0, not 2
  const saveArticle = async (index) => {
    console.log(index)
      // Toggle heart state for the clicked card
      setHeartStates(prevState => {
        const updatedStates = [...prevState];
        updatedStates[index] = !updatedStates[index];
        console.log("Index: " + index);
        //console.log('Updated Heart States:', updatedStates);
        return updatedStates;
      });

  };


  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.horizontalView}>
          <View style={styles.verticalView}>
            <Text style={styles.mainHeader}>Hello👋🏻</Text>
            <Text style={styles.nameHeader}>{username}</Text>
          </View>
          <TouchableHighlight style={styles.button}
            onPress={() => navigation.navigate("Settings screen", {username, name, pass, date}) }>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
              <Image
                source={require('../assets/images/Default_pfp.jpeg')}
                style={styles.image}
              />
            )}
          </TouchableHighlight>
        </View>
        <Text style={styles.header}>Home</Text>
        <Text style={styles.subheader}>Trending news</Text>

          <View style={styles.verticalView}>
            {/* Rendering news articles */}
            <View style={styles.horizontalView}>
            {articles.slice(0, 2).map((article, index) => (
              
              <Card key={article.url} style={styles.card} onPress={() => {navigation.navigate("Article screen", { title: article.title, author: article.author, image: article.urlToImage ,desc: article.description, url: article.url})              ,
               {title:article.title, author:article.author, } }}>
                <Card.Cover source={{ uri: article.urlToImage }} />
                <Card.Content>
                  <Text style={styles.cardTitle} variant="titleLarge">{article.title}</Text>
                  <Text style={styles.text} variant="bodyMedium" marginBottom={10}>{article.author}</Text>
                </Card.Content>
                <Card.Actions>
                  <AntDesign name={heartStates[index] ? "heart" : "hearto"} size={24} color={heartStates[index] ? "green" : "green"} onPress={() => saveArticle(index)} />
                </Card.Actions>
              </Card>
              ))}
            </View>
            <View style={styles.horizontalView}>

            {articles.slice(2, 4).map((article, index) => (
              <Card key={article.url} style={styles.card} onPress={() => { navigation.navigate("Article screen", { title: article.title, author: article.author, image: article.urlToImage, desc: article.description, url: article.url }) }}>
                <Card.Cover source={{ uri: article.urlToImage }} />
                <Card.Content>
                  <Text style={styles.cardTitle} variant="titleLarge">{article.title}</Text>
                  <Text style={styles.text} variant="bodyMedium" marginBottom={10}>{article.author}</Text>
                </Card.Content>
                <Card.Actions>
                  <AntDesign name={heartStates[index + 2] ? "heart" : "hearto"} size={24} color={heartStates[index + 2] ? "green" : "green"} onPress={() => saveArticle(index + 2)} />
                </Card.Actions>
              </Card>
              ))}
            </View>
          </View>



        <Text style={styles.subheader} colors={colors.salmon}>Read by genre</Text>
        <View style = {styles.genreCard}>
          <ScrollView horizontal={true}>

            <Card style={[styles.categoryCard]} onPress={() => { navigation.navigate("Read by genre")}}>
              {/* The Card.Content, Card.Cover, and Card.Actions are all children of the Card component that adds customization to card*/}
              <Text style={styles.categoryText} variant="titleLarge">Plastic Waste</Text>
              <Card.Cover source={require('../assets/images/plastic.jpeg')} style={styles.categoryImage} />
            </Card>
            <Card
              style={styles.categoryCard}>
              {/* The Card.Content, Card.Cover, and Card.Actions are all children of the Card component that adds customization to card*/}
              <Text style={styles.categoryText} variant="titleLarge">Big businesses</Text>
              <Card.Cover source={require('../assets/images/businesses.jpeg')} style={styles.categoryImage} />
            </Card>
            <Card
              style={styles.categoryCard}>
              {/* The Card.Content, Card.Cover, and Card.Actions are all children of the Card component that adds customization to card*/}
              <Text style={styles.categoryText} variant="titleLarge">Global warming</Text>
              <Card.Cover source={require('../assets/images/globalWarming.jpeg')} style={styles.categoryImage} />
            </Card>


          </ScrollView>
        </View>


      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: colors.tan,
  },
  card: {
    marginTop: 10,
    padding: 5,
    margin: 5,
    width: 190,
    backgroundColor: colors.offwhite,
  },
  cardTitle: {
    fontSize: 20,
    marginBottom: 3,
  },
  mainHeader: {
    fontSize: 40,
    marginRight: 100,
    marginTop: 20,
  },
  nameHeader: {
    fontSize: 40,
    fontWeight: "200",
  },
  text: {
    color: colors.greyblue,
    fontWeight: "bold"
  },
  header: {
    fontSize: 30,
    marginTop: 50,
    marginLeft: 20
  },
  subheader: {
    fontSize: 20,
    marginTop: 30,
    marginLeft: 20,
    fontWeight: "bold"
  },
  horizontalView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  verticalView: {
    flexDirection: "column",
    justifyContent: "center",
  },
  categoryText: {
    color: colors.offwhite,
    position: "absolute",
    zIndex: 10,
    fontWeight: "bold",
    margin: 25,
    marginTop: 150,
    fontSize: 28,
    
  },
  categoryCard: {
    marginTop: 10,
    margin: 5,
    width: 200,
    height: 370,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  categoryImage: {
    width: 200,
    height: 370,
    opacity: 0.7
  },
  button: {
    height: 120,
    width: 120,
    borderRadius: 60,
    marginTop: 40,
  },

  image: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: colors.darkGreen,

  },

  genreCard: {
    alignItems: "center",
    justifyContent: "center",
  }
})
