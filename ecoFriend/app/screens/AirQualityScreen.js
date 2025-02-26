import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, Map, TouchableHighlight} from 'react-native'

import colors from '../config/colors'
import React, { useEffect, useState } from 'react';
import { commonStyles } from '../config/styles'
import axios from 'axios';

import { Button, DataTable } from 'react-native-paper';
import DataTableComponent from '../components/DataTable';


export default function AirQualityScreen() {
    const [zipcode, setZipcode] = useState("");
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [aqiVal, setAqi] = useState(null);

    useEffect(() => {
        if (zipcode !== "" && zipcode.length == 5) {
            fetchLonLat();
        }
      }, [zipcode]);

        // get longitude and latitude based on zipcode (Geoencoding)
        async function fetchLonLat() {
            try {
                const response = await axios.get(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode},US&appid=f7e3230cdefc713144eb7a5c9350bab5`);
                // console.log("API response:", response);
                setLongitude(response.data.lon);
                setLatitude(response.data.lat);     
                console.log("fetched lon lat " + longitude + " " + latitude);           
            } catch (error) {
                console.error('Error fetching longitude and latitude:', error);
                alert("Please enter a valid zipcode")
            }
       
        }

        async function fetchAirQuality() {
          try {
            // API Link:  http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={API key}
            fetchLonLat();
            const response = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=f7e3230cdefc713144eb7a5c9350bab5`);
            // console.log("API response" + response);
            setAqi(response.data.list[0].main.aqi);
            console.log("AQI:", aqiVal);
          } catch (error) {
            console.error('Error fetching air quality:', error);
          }
        }
      
        const handleOnClick = () => {
            fetchAirQuality();
            Keyboard.dismiss();
        }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Text style = {styles.text}>Your Air Quality Report</Text>
                <TextInput 
                    style = {styles.textInputBox}
                    placeholder='Zipcode'
                    inputMode='numeric'
                    onChangeText={text => setZipcode(text)}
                    />
                <View style = {styles.buttonContainer}>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={handleOnClick} // Fetch air quality
                        underlayColor={colors.greyblue}
                        disabled={latitude == "" || longitude == ""}
                    >
                        <Text>Get AQI</Text>
                    </TouchableHighlight>
                </View>

                <Text style = {styles.textSmall}>Air Quality Index for {zipcode}: {aqiVal}</Text>

                <DataTableComponent>
                    
                </DataTableComponent>

            </View>
        </TouchableWithoutFeedback>
    )  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.tan
    },

    textInputBox: {
        width: 350,
        height: 40,
        borderRadius: 5,
        borderWidth: 2, 
        borderColor: colors.green,
        backgroundColor: "white",
        margin: 20,
        padding: 5,
        fontSize: 20,
    },
    
    button: {
        width: 100,
        height: 50, 
        borderRadius: 5, 
        backgroundColor: colors.green,
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
    },

    buttonContainer: {
        alignItems: "center",
        justifyContent: "center"
    },

    text: {
        margin: 10,
        fontSize: 24, 
        color: colors.darkGreen,
    },

    textSmall: {
        margin: 10, 
        fontSize: 18, 
        color: colors.darkGreen
    }
})
