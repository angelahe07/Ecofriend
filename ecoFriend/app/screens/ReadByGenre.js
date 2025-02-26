import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState} from 'react'
import { useRoute, useNavigation } from '@react-navigation/native';
import colors from '../config/colors';
import axios from 'axios';
import { Card } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons/';


export default function SavedArticlesScreen() {
  const route = useRoute();
  const [articlesPW, setArticlesPW] = useState([]);
  const [articlesBB, setArticlesBB] = useState([]);
  const [articlesGW, setArticlesGW] = useState([]);
  const navigation = useNavigation();

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
        const responsePW = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            from: getDate(),
            q: 'pollution',
            sortBy: 'popularity',
            apiKey: '452dc3bb747c47179df23ad0f525d63b'
          }
        });

        const responseBB = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            from: getDate(),
            q: 'big business', 
            sortBy: 'popularity',
            apiKey: '452dc3bb747c47179df23ad0f525d63b'
          }
        });

        const responseGW = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            from: getDate(),
            q: 'global warming',
            sortBy: 'popularity',
            apiKey: '452dc3bb747c47179df23ad0f525d63b'
          }
        });
  
        const articlesDataPW = responsePW.data.articles;
        setArticlesPW(articlesDataPW);
        console.log("Plastic Waste: " + articlesDataPW)

        const articlesDataBB = responseBB.data.articles;
        setArticlesBB(articlesDataBB);
        console.log("Big Business: " + articlesBB)

        const articlesDataGW = responseGW.data.articles;
        setArticlesGW(articlesDataGW);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    }
  
    fetchNews(); // Invoke the fetchNews function
  }, []); // Empty dependency array to ensure the effect runs only once
  
    // Function to get a specific article by its index
    const [heartStatesPW, setHeartStatesPW] = useState([]);
    const [heartStatesBB, setHeartStatesBB] = useState([]);
    const [heartStatesGW, setHeartStatesGW] = useState([]);
    
    const saveArticle = async (index) => {
        // Toggle heart state for the clicked card
        setHeartStatesPW(prevState => {
          const updatedStates = [...prevState];
          updatedStates[index] = !updatedStates[index];
          return updatedStates;
        });

        setHeartStatesBB(prevState => {
          const updatedStates = [...prevState];
          updatedStates[index] = !updatedStates[index];
          return updatedStates;
        });

        setHeartStatesGW(prevState => {
          const updatedStates = [...prevState];
          updatedStates[index] = !updatedStates[index];
          return updatedStates;
        });
  
    };

  return (
    <View style={styles.container}>
      <ScrollView>
      <Text style={styles.mainHeader}>Read By Genre</Text>
      <View style={styles.verticalView}>
      <Text style={styles.header}>Pollution 🗑️</Text>
      <View style={styles.horizontalView}>
        <ScrollView horizontal={true}>
        {articlesPW.slice(0,10).map((article, index) => (
              <Card key={article.url} style={styles.card} onPress={() => {navigation.navigate("Article screen", { title: article.title, author: article.author, image: article.urlToImage ,desc: article.description, url: article.url})              ,
              {title:article.title, author:article.author, } }}>
                <Card.Cover source={{ uri: article.urlToImage }} />
                <Card.Content>
                  <Text style={styles.cardTitle} variant="titleLarge">{article.title}</Text>
                  <Text style={styles.text} variant="bodyMedium" marginBottom={10}>{article.author}</Text>
                </Card.Content>
                <Card.Actions>
                  <AntDesign name={heartStatesPW[index] ? "heart" : "hearto"} size={24} color={heartStatesPW[index] ? "green" : "green"} onPress={() => saveArticle(index)} />
                </Card.Actions>
              </Card>
              ))}
              </ScrollView>
      </View>
      <Text style={styles.header}>Big Businesses 🏦</Text>
      <View style={styles.horizontalView}>
        <ScrollView horizontal={true}>
        {articlesBB.slice(0,10).map((article, index) => (
              <Card key={article.url} style={styles.card} onPress={() => {navigation.navigate("Article screen", { title: article.title, author: article.author, image: article.urlToImage ,desc: article.description, url: article.url})              ,
              {title:article.title, author:article.author, } }}>
                <Card.Cover source={{ uri: article.urlToImage }} />
                <Card.Content>
                  <Text style={styles.cardTitle} variant="titleLarge">{article.title}</Text>
                  <Text style={styles.text} variant="bodyMedium" marginBottom={10}>{article.author}</Text>
                </Card.Content>
                <Card.Actions>
                  <AntDesign name={heartStatesBB[index + 10] ? "heart" : "hearto"} size={24} color={heartStatesBB[index + 10] ? "green" : "green"} onPress={() => saveArticle(index + 10)} />
                </Card.Actions>
              </Card>
              ))}
              </ScrollView>
      </View>
      <Text style={styles.header}>Global Warming 🌎</Text>
      <View style={styles.horizontalView}>
        <ScrollView horizontal={true}>
        {articlesGW.slice(0,10).map((article, index) => (
              <Card key={article.url} style={styles.card} onPress={() => {navigation.navigate("Article screen", { title: article.title, author: article.author, image: article.urlToImage ,desc: article.description, url: article.url})              ,
              {title:article.title, author:article.author, } }}>
                <Card.Cover source={{ uri: article.urlToImage }} />
                <Card.Content>
                  <Text style={styles.cardTitle} variant="titleLarge">{article.title}</Text>
                  <Text style={styles.text} variant="bodyMedium" marginBottom={10}>{article.author}</Text>
                </Card.Content>
                <Card.Actions>
                  <AntDesign name={heartStatesGW[index + 20] ? "heart" : "hearto"} size={24} color={heartStatesGW[index + 20] ? "green" : "green"} onPress={() => saveArticle(index + 20)} />
                </Card.Actions>
              </Card>
              ))}
              </ScrollView>
      </View>

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
  mainHeader: {
    fontSize: 40,
    marginLeft: 20,
    marginTop: 80,
    color: colors.darkGreen,
    fontWeight: "bold"
  },
  header: {
    fontSize: 30,
    marginTop: 20,
    marginLeft: 20,
    color: colors.darkGreen
  },
  horizontalView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  verticalView: {
    flexDirection: "column"
  },
  cardTitle: {
    fontSize: 20,
    marginBottom: 3,
  },
  card: {
    marginTop: 20,
    padding: 5,
    margin: 6,
    width: 190,
    height: "80%",
    backgroundColor: colors.offwhite,
  },
})