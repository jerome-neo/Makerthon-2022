import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import * as Notifications from 'expo-notifications'; // REQUIRED. Need this for all things related to Notifications from Expo
import AsyncStorage from '@react-native-async-storage/async-storage';


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
  // Define your data
  const [data, setData] = useState(1200);

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
      <TouchableOpacity style={styles.button} onPress={() => handleSubmit(1300)}>
        <Text style={styles.text}> Change time to 1300 </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() =>  handleSubmit(1200)}>
        <Text style={styles.text}> Change time to 1200 </Text>
      </TouchableOpacity> 
      <StatusBar style="auto" />
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
