import React from 'react'; 
import { StyleSheet } from 'react-native'; 
import { DataTable } from 'react-native-paper'; 
import colors from '../config/colors';

// Link: https://www.geeksforgeeks.org/how-to-create-a-table-in-react-native/
// Description: Create a Data Table using react native paper
const DataTableComponent = () => { 
    return ( 
      <DataTable style={styles.container}> 
        <DataTable.Header style={styles.tableHeader}> 
          <DataTable.Title style = {styles.headerText1}>Qualitative</DataTable.Title> 
          <DataTable.Title style = {styles.headerText2}>Air Quality Index</DataTable.Title> 
        </DataTable.Header> 
        
        <DataTable.Row> 
          <DataTable.Cell style = {styles.cell}>Good</DataTable.Cell> 
          <DataTable.Cell style = {styles.cell}>1</DataTable.Cell> 
         
        </DataTable.Row> 
        <DataTable.Row> 
          <DataTable.Cell style = {styles.cell}>Fair</DataTable.Cell> 
          <DataTable.Cell style = {styles.cell}>2</DataTable.Cell> 
         
        </DataTable.Row> 
        <DataTable.Row> 
          <DataTable.Cell style = {styles.cell}>Moderate</DataTable.Cell> 
          <DataTable.Cell style = {styles.cell}>3</DataTable.Cell> 
         
        </DataTable.Row> 
        <DataTable.Row> 
          <DataTable.Cell style = {styles.cell}>Poor</DataTable.Cell> 
          <DataTable.Cell style = {styles.cell}>4</DataTable.Cell> 
         
        </DataTable.Row> 
        <DataTable.Row> 
          <DataTable.Cell style = {styles.cell}>Very Poor</DataTable.Cell> 
          <DataTable.Cell style = {styles.cell}>5</DataTable.Cell> 
         
        </DataTable.Row> 
      </DataTable> 
    ); 
  }; 
    
  export default DataTableComponent; 
    
  const styles = StyleSheet.create({ 
    container: { 
      padding: 20, 
      justifyContent: "center",
    }, 
    tableHeader: { 
      backgroundColor: "white", 
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 16,
      marginRight: 16,
      borderColor: colors.green,
      borderWidth: 2,
    }, 

    cell:{
        borderWidth: 2,
        borderColor: colors.green,
        justifyContent: "center",
    },

    headerText1: {
        justifyContent: "center",
        marginRight: 5,
    },

    headerText2: {
        justifyContent: "center",
        marginLeft: 10,
    }
  });