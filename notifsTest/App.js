import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Button } from 'react-native';
import * as Notifications from 'expo-notifications'; // REQUIRED. Need this for all things related to Notifications from Expo
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker'; // time picker

// Settings for notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const TIME_KEY = "@time_key";
// First, we test AsyncStorage
export default function App() {
  // Define your data with hooks
  const [data, setData] = useState(1200);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    const curr_hr = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
    const curr_min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    const curr_time = curr_hr + ":" + curr_min;
    handleSubmit(curr_time);
    console.log(data);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showTimepicker = () => {
    showMode('time');
  };

  // Storing of data
  const saveData = async () => {
    try {
      await AsyncStorage.setItem(TIME_KEY, JSON.stringify(data));
    } catch (e) {
      console.log(e);
    }
  }

  // Retrieving data
  const readData = async () => {
    try {
      const getState = await AsyncStorage.getItem(TIME_KEY);
      if (getState != null) {
        setData(JSON.parse(getState));
      }
    } catch(e) {
      // error reading value
      console.log(e);
    }
  }

  // Clearing all data
  const clearData = async () => {
    try {
      await AsyncStorage.clear();
      alert('Storage cleared successfully');
    } catch (e) {
      alert('Failed to clear local storage');
    }
  }

  // call this to read data when component mounts
  useEffect(() => {
    readData();
  }, [])

  // call this to ensure that data is saved properly on first click
  useEffect(() => {
    saveData();
  }, [data]);


  const handleSubmit = (time) => {
    setData(time);
    saveData();
  }

  return (
    <View style={styles.container}>
      <Text>Testing Push Notifications With Local Storage</Text>
      <Text> The time selected is: {data} </Text>
      <Text> Current chosen time: {data} </Text>
      <Button title="Show time picker" onPress={() => showTimepicker()}/>
        {show && <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  button: {
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'red',   
    backgroundColor: 'black'
  },

  text: {
    fontSize: 24,
    color: 'white'
  }
});
