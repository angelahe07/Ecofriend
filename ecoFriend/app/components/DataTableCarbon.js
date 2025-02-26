import React from 'react'; 
import { StyleSheet } from 'react-native'; 
import { DataTable } from 'react-native-paper'; 
import colors from '../config/colors';

// Link: https://www.geeksforgeeks.org/how-to-create-a-table-in-react-native/
// Description: Create a Data Table using react native paper
const DataTableCarbon = () => { 
    return ( 
      <DataTable style={styles.container}> 
        <DataTable.Header style={styles.tableHeader}> 
          <DataTable.Title style = {styles.headerText1}>{"Carbon Footprint Scale in pounds per month"} </DataTable.Title> 
        </DataTable.Header> 
        
        <DataTable.Row> 
          <DataTable.Cell style = {styles.cell}>Very Low</DataTable.Cell> 
          <DataTable.Cell style = {styles.cell}>{"< 500"}</DataTable.Cell> 
         
        </DataTable.Row> 
    
        <DataTable.Row> 
          <DataTable.Cell style = {styles.cell}>Ideal</DataTable.Cell> 
          <DataTable.Cell style = {styles.cell}>500 - 1,333</DataTable.Cell> 
         
        </DataTable.Row> 
        <DataTable.Row> 
          <DataTable.Cell style = {styles.cell}>Average</DataTable.Cell> 
          <DataTable.Cell style = {styles.cell}>1,333 - 1,833</DataTable.Cell> 
         
        </DataTable.Row> 
        <DataTable.Row> 
          <DataTable.Cell style = {styles.cell}>Too High</DataTable.Cell> 
          <DataTable.Cell style = {styles.cell}>{"> 1,833"}</DataTable.Cell> 
         
        </DataTable.Row> 
        
      </DataTable> 
    ); 
  }; 
    
  export default DataTableCarbon; 
    
  const styles = StyleSheet.create({ 
    container: { 
      padding: 20, 
      justifyContent: "center",
    }, 
    tableHeader: { 
      backgroundColor: colors.tan, 
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 16,
      marginRight: 16,
      borderColor: colors.darkGreen,
      borderWidth: 2,
    }, 

    cell:{
        borderWidth: 2,
        borderColor: colors.darkGreen,
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