import { Text, View, StyleSheet, FlatList, TextInput, TouchableHighlight, Keyboard, ScrollView } from 'react-native';
import React, {useState, useEffect} from "react";
import firebase from 'firebase/app';
import 'firebase/database';
import colors from '../config/colors';
import {LineChart,BarChart,PieChart,ProgressChart,ContributionGraph,StackedBarChart} from 'react-native-chart-kit';
import Constants from 'expo-constants';
import CarbonFootPrint from './CarbonFootPrint';
import carbonTotals from './CarbonFootPrint';
import { collection, getDocs } from "firebase/firestore";
import { carbon, db, tempArray, fetchData } from '../config/firebase';
import { useIsFocused, useNavigation } from '@react-navigation/native';


export default function MonthlyReport() {
  // Description: Fixes the InvalidNumber Error by adding a loading state to make sure data loads correctly
  // Link: https://github.com/indiespirit/react-native-chart-kit/issues/237
  const [carbonData, setCarbonData] = useState({data:[],loading:true});
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  
  // get carbonData from firebase
  useEffect(() => {
    let totalValues = [];
    const fetchCarbonData = async () => {
      // fetchData outputs array with carbons: (number)}
      const data = await fetchData(); 
      console.log("data: " + data.toString())
      // Description: must iterate through data to get only the total values
      // Link: https://chat.openai.com/share/10ccf40f-328a-4bdc-9e94-dcc2f687b7b1 
      data.forEach(item => {
        // Access the "carbon" value of each object
        let total = item.carbons;
        console.log("total: " + total)
        // Check if the "total" value is not empty and is a valid number
        if (total !== "" && !isNaN(total)) {
            // Convert the total value to a number and push to the result array
            totalValues.push(parseFloat(total));
        }
    });
      setCarbonData({data: totalValues, loading: false});
      console.log("NewData: " + totalValues)
    };
    const unsubscribe = navigation.addListener('focus', fetchCarbonData);
  }, [isFocused, navigation]); // Run once on component mount

  return (
    <ScrollView style={styles.scrollStyle}>
      <View style={styles.bigView}>
      <View style={[styles.inputTextRow, {backgroundColor: colors.pink}]}>
        <Text style={styles.textLabel}>Your carbon footprint trend in lbs 👣</Text>
        <ScrollView horizontal={true}>
        <View>
          {carbonData.loading ? (<Text>Loading ⏳</Text>): (
        <LineChart
          style={styles.lineChart}
          data={{
            labels: [],
            datasets: [
              {
                data: carbonData.data          
              },
            ],
          }}
          width={350} // from react-native
          height={500}
          yAxisInterval={2} // optional, defaults to 1
          
          chartConfig={{
            backgroundGradientFrom: colors.green,
            backgroundGradientTo: colors.darkGreen,
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => colors.dark,
            labelColor: (opacity = 1) => colors.dark,
            style: {
              borderRadius: 3,
            },
            propsForDots: {
              r: 5,
              strokeWidth: 2,

              stroke: colors.darkGreen
            },

          }}
          bezier
        />)}
</View>
        </ScrollView>
        
      </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  inputTextRow:{
    flexDirection: "column",
    height: 650,
    width:370,
    
    marginBottom:15,
    marginTop:10,
    borderRadius:20,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    
    alignItems: "center",
    
  },
  textLabel:{
    fontSize:20,
    color:colors.dark,
    marginLeft:10,
    marginTop: 40,
    marginBottom:10,
    alignItems: "center",
  },

  scrollStyle:{
    backgroundColor: colors.tan,
    
  },

  bigView:{
    alignItems: "center"
  },

  lineChart:{
    margin: 10,
    borderRadius: 10,
    //flexDirection: "row",
    //alignItems: "flex-end"
    
  }

})