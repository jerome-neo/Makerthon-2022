// Testing for the mood calendar

import React, { useState } from 'react';
import { SafeAreaView, Text, Button, View } from 'react-native';
import * as dateFn from 'date-fns';


const MoodTest = () => {
  const [date, setDate] = useState(new Date());

  // remember to add const
  const months = ["January", "February", "March", "April", 
  "May", "June", "July", "August", "September", "October", 
  "November", "December"];
  
  const weekDays = [
      "Sun","Mon","Tue","Wed","Thu","Fri","Sat"
  ];

  const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


  // function to populate your array with the dates
  const generateMatrix = () => {
    let matrix = [];
    // Create header
    matrix[0] = weekDays;
    let year = date.getFullYear(); // a number
    let month = date.getMonth(); // a number

    // **any date function, returns you a number


    // first day of the month
    let firstDay = new Date(year, month, 1).getDay();
    let maxDays = nDays[month]; // max number of days for month, pre-defined
    if (month == 1) { // February
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        maxDays += 1;
      }
    }

    // day starts from 1
    let counter = 1;
    // start from row 1, because row 0 populated by strings
    // 7 because 7x7 can fill everything
    for (let row = 1; row < 7; row++) {
      matrix[row] = []; // represent as 2d array

      for (let col = 0; col < 7; col++) {
        // start from -1, until we hit the first day
        matrix[row][col] = -1;
        if (row == 1 && col >= firstDay) {
          // Fill in rows only after the first day of the month
          matrix[row][col] = counter++;
        } else if (row > 1 && counter <= maxDays) {
          // Fill in rows only if the counter's not greater than
          // the number of days in the month
          matrix[row][col] = counter++;
        }
      }
    }
    
    return matrix;
  }
  
    // make your matrix <-- 2d array of dates
    let matrix = generateMatrix();


    let rows = [];
    
    // actual population

    rows = matrix.map((row, rowIndex) => {
      let rowItems = row.map((item, colIndex) => {
        return (
            <Text
              style={{
                flex: 1,
                height: 20,
                textAlign: 'center',
                // Highlight header
                backgroundColor: rowIndex === 0 ? '#ddd' : '#fff',
                // Highlight Sundays
                color: colIndex === 0 ? '#a00' : '#000',
                // Highlight current date
                fontWeight: item === date.getDate() 
                                    ? 'bold': 'normal',
                fontSize: 18,
                
              }}
              key={colIndex}
              onPress={() => console.log("Pressed")}>
              {item != -1 ? item : ''}
            </Text>
        );
      });
      return (
        <View
          style={{
            flexDirection: 'row',
            padding: 35,
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          {rowItems}
        </View>
      );
    });

    /*
    TO DO: WJ will linkup with mood tracking
    */

    
    // const _onPress = (item) => {    
    //   //item is a number representing the day
    //   console.log(item.match)
    //   setState(() => {
    //     if (!item.match && item != -1) {
    //       date.setDate(item);
    //       return date;
    //     }
    //   });
    //  };
    
    
    const changeMonth = (n) => {
      const curr = n > 0 ? dateFn.addMonths(date, Math.abs(n)) : dateFn.subMonths(date, Math.abs(n));
      console.log(curr);
      return setDate(curr);
    }
    

    return (
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
          <Text style={{
            fontWeight: 'bold',
            fontSize: 30,
            textAlign: 'center',
            marginTop: 20
            }}>
            {months[date.getMonth()]} &nbsp;
            {date.getFullYear()}
            
          </Text>
      
          { rows }
          
        <Button title="Previous"
          style={{flexDirection:'left'}}
          onPress={() => changeMonth(-1)}/>
        <Button title="Next"
          style={{flexDirection:'right'}}
          onPress={() => changeMonth(1)}/>  
      </SafeAreaView>
    );

}


export default MoodTest;