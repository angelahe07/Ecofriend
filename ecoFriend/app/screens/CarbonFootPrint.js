import React, {useEffect, useState} from "react";

import firebase from 'firebase/app';


import { collection, getDocs, serverTimestamp } from "firebase/firestore";
import { //addCarbonData,
   db } from "../config/firebase";

        
import Constants from 'expo-constants';
import { UserProfile } from "../config/firebase";

import {Text, View, StyleSheet, FlatList, TextInput, TouchableHighlight, Keyboard, ScrollView, TouchableOpacity} from "react-native";
const LeftContent = (props) => <Avatar.Icon {...props} icon="map" />;
import colors from '../config/colors';
import {addCarbonArray, auth} from "../config/firebase";
import DataTableCarbon from "../components/DataTableCarbon";


export default function CarbonFootPrint() {
  const[id,setId]=useState(1);
  const[gas,setGas]=useState("");
  const[electric,setElectric]=useState("");
  const[oil,setOil]=useState("");
  const[mileage,setMileage]=useState("");
  const[fly,setFly]=useState("");
  const[paper,setPaper]=useState("");
  const[metal,setMetal]=useState("");
  const [total, setTotal]=useState(0);
  const [carbon, setCarbon]=useState([]);
  const [carbonTotals, setCarbonTotals]=useState([]);
  

  const [metalResp, setMetalResp] = useState("");
  const [paperResp, setPaperResp] = useState("");

  useEffect(() => {
    console.log("Updated Totals:", total);
  }, [total]);
  

  
  const handleAddCarbon=()=>{
    const calculatedTotal = gas * 8.75 + electric * 8.75 + oil * 9.41666666667 + mileage * 0.79 + fly * 396.8316 + 
                            paper * 15.3333333333 + metal * 13.8333333333;
    setTotal(calculatedTotal);
    console.log("total: " + total);

    const newCarbon={
      id:id,
      gas:gas,
      electric:electric,
      oil:oil,
      mileage:mileage,
      fly:fly,
      paper:paper,
      metal:metal,
      
      total: calculatedTotal,
    }
    setId(id + 1);
    
    // need to add calculatedTotal to array instead of total - async causes total to not be updated quickly enough
    addCarbonArray(auth.currentUser.uid, calculatedTotal);

    setMetalResp("");
    setPaperResp("");
    setCarbon([...carbon, newCarbon]);
    setId(id+1);
    setGas("");
    setElectric("");
    setOil("");
    setMileage("");
    setFly("");
    setPaper("");
    setMetal("");
    
    Keyboard.dismiss();
    console.log("Carbontotals: " + carbonTotals);
  }
  

  const metalYes=()=>{
    setMetal(0);
    setMetalResp("Yes")
  }

  const metalNo=()=>{
    setMetal(1);
    setMetalResp("No")
  }

  const paperYes=()=>{
    setPaper(0);
    setPaperResp("Yes")
  }

  const paperNo=()=>{
    setPaper(1);
    setPaperResp("No")
  }

  
  return (
    <ScrollView style={styles.scrollStyle}>
      <View style={styles.bigView}>
          <Text style={styles.textHeader}>Your monthly carbon footprint calculator</Text>
          <View style={[styles.inputTextRow, {backgroundColor: colors.lime}]}>
            <Text style={styles.textLabel}>What is your monthly electric bill?</Text>
            <TextInput style={[styles.textInput]}
            onChangeText={text=>setElectric(text)}
            keyboardType="numeric"
            value={electric}
            />
          
          </View>
          
          <View style={[styles.inputTextRow, {backgroundColor: colors.pink}]}>
            <Text style={styles.textLabel}>What is your monthly gas bill?</Text>
            <TextInput style={[styles.textInput]}
            onChangeText={text=>setGas(text)}
            keyboardType="numeric"
            value={gas}
            />
          </View>

          <View style={[styles.inputTextRow, {backgroundColor: colors.blue}]}>
            <Text style={styles.textLabel}>How much do you spend on oil per month?</Text>
            <TextInput style={[styles.textInput]}
            onChangeText={text=>setOil(text)}
            keyboardType="numeric"
            value={oil}
            />
          </View>

          <View style={[styles.inputTextRow, {backgroundColor: colors.salmon}]}>
            <Text style={styles.textLabel}>What is your monthly mileage on your car?</Text>
            <TextInput style={[styles.textInput]}
            onChangeText={text=>setMileage(text)}
            keyboardType="numeric"
            value={mileage}
            />
          </View>

          <View style={[styles.inputTextRow, {backgroundColor: colors.lime}]}>
            <Text style={styles.textLabel}>How many hours have you spent flying in the past month?</Text>
            <TextInput style={[styles.textInput]}
            onChangeText={text=>setFly(text)}
            keyboardType="numeric"
            value={fly}
            />
          </View>

          <View style={[styles.inputTextRow, {backgroundColor: colors.blue}]}>
            <Text style={styles.textLabel}>Do you recycle newspaper? {paperResp}</Text>
            <View style={styles.questionHolder}>
              <TouchableHighlight 
                style={[styles.button, {backgroundColor: colors.salmon, borderColor: colors.dark, textColor: colors.dark, margin:20, marginLeft:20}]}
                  underlayColor={colors.blue}
                backgroundColor={colors.dark}
                
                onPress={paperYes}
                >
              <Text style = {[styles.text, {marginTop:5}, {marginLeft:5}]}>Yes</Text>
          
              </TouchableHighlight>

              <TouchableHighlight 
                style={[styles.button, {backgroundColor: colors.salmon, borderColor: colors.dark, textColor: colors.dark, margin:20, marginLeft:20}]}
                  underlayColor={colors.blue}
                backgroundColor={colors.dark}
                
                onPress={paperNo}
                >
              <Text style = {[styles.text, {marginTop:5}, {marginLeft:5}]}>No</Text>
          
              </TouchableHighlight>
              
              </View>
          </View>

          <View style={[styles.inputTextRow, {backgroundColor: colors.pink}]}>
            <Text style={styles.textLabel}>Do you recycle aluminum and tin? {metalResp}</Text>
            <View style={styles.questionHolder}>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: colors.salmon, borderColor: colors.dark, textColor: colors.dark, margin:20, marginLeft:20}]}
                underlayColor={colors.blue}
                backgroundColor={colors.dark}
                onPress={metalYes}
                >
              <Text style = {[styles.text, {marginTop:5}, {marginLeft:5}]}>Yes</Text>
          
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.button, {backgroundColor: colors.salmon, borderColor: colors.dark, textColor: colors.dark, margin:20, marginLeft:20}]}
                  underlayColor={colors.blue}
                backgroundColor={colors.dark}
                
                onPress={metalNo}
                >
              <Text style = {[styles.text, {marginTop:5}, {marginLeft:5}]}>No</Text>
          
              </TouchableOpacity>
              </View>

          </View>

          <View style={[styles.totalHolder, {backgroundColor: colors.green}, {alignItems:"center"}]}>
          <View>
            <Text style={[styles.text, {marginTop:30}]}>Tap below to calculate your monthly carbon footprint!</Text>
            <TouchableHighlight 
              style={[styles.button, {backgroundColor: colors.salmon, borderColor: colors.dark, textColor: colors.dark, margin:20, marginLeft:90}]}
                underlayColor={colors.blue}
               backgroundColor={colors.dark}
               
               onPress={handleAddCarbon}
              >
             <Text style = {[styles.text, {marginTop:5}, {marginLeft:5}]}>Calculate</Text>
        
            </TouchableHighlight>
          </View>

          <View style={[styles.text, {marginBottom:30}]}>
            <Text style={styles.text}>
              Your carbon footprint this month is: {""} 
            </Text>

            <Text style={styles.text}>
              <Text>{total}</Text> pounds
            </Text>
          </View>
          </View>

          {/* this is making the scale for the carbon footprint */}
          <View style={[styles.totalHolder, {backgroundColor: colors.lime}, {alignItems:"center"}]}>
            <DataTableCarbon></DataTableCarbon>
          </View>
        </View>


      </ScrollView>
  )
}



const styles = StyleSheet.create({
  text:{
    color: colors.dark,
    fontSize: 20,
    marginTop:20,
    
  },

 
  textHeader: {
    color: colors.dark,
    fontSize: 30,
    margin:20,
    textAlign: "center",
  },

  inputTextRow:{
    flexDirection: "column",
    height:150,
    width:370,
    marginBottom:15,
    marginTop:10,
    borderRadius:20,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    justifyContent:"center",
  },
  questionHolder:{
    justifyContent:"center",
    flexDirection:"row"
  },

  scrollStyle:{
    backgroundColor: colors.tan,
  },

  bigView:{
    alignItems: "center",
    justifyContent: "center"
  },

  totalHolder:{
    flexDirection: "column",
    height:290,
    width:370,
    marginBottom:15,
    marginTop:10,
    borderRadius:20,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    alignItems:"center"
  },


  textLabel:{
    fontSize:20,
    color:colors.dark,
    margin: 15,
    textAlign: "auto"
  },

  textInput:{
    backgroundColor:colors.tan,
    fontSize:20,
    borderWidth:1,
    borderColor:colors.dark,
    margin: 15,
    borderRadius:5,
    marginTop:10,
    marginBottom:10,
    width:70,
  },

  button:{
    width:125,
    height:50,
    borderRadius: 50,
    backgroundColor: colors.dark,
    borderColor: colors.dark,
    borderWidth:2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom:5,
    marginLeft:10,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 3,

  },

  background:{
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.tan,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  optionButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
  },
  optionText: {
    fontSize: 16,
  },
  selectedButton: {
    backgroundColor: colors.green, // Change this color to indicate selection
  },
})
