// Component that allows users to select a time for their daily notifications.
// Need to add an option to turn off notifications

import React, { useState, useEffect } from 'react';
import { Button, TouchableOpacity, StyleSheet, Text, View, Picker } from 'react-native';
import * as Notifications from 'expo-notifications'; // REQUIRED. Need this for all things related to Notifications from Expo
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

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
const SetNotifications = () =>  {
  // Define your time with hooks. We use this as the default time. This is a string used to display time only.
  const [time, setTime] = useState("12:34");

  // stuff for DateTimePicker
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    // getting time and formatting it to the correct string
    const curr_hr = selectedDate.getHours() < 12 ? selectedDate.getHours() : selectedDate.getHours() - 12;
    const curr_min = selectedDate.getMinutes() < 10 ? "0" + selectedDate.getMinutes() : selectedDate.getMinutes();
    const AM_PM = selectedDate.getHours() > 12 ? " PM" : " AM";
    const curr_time = curr_hr + ":" + curr_min + AM_PM;
    setTime(curr_time);
    cancelBeforeAndSchedule();
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showTimepicker = () => {
    showMode('time');
  };


  // Storing of time
  const saveTime = async () => {
    try {
      await AsyncStorage.setItem(TIME_KEY, JSON.stringify(time));
    } catch (e) {
      console.log(e);
    }
  }

  // Retrieving time
  const readTime = async () => {
    try {
      const getState = await AsyncStorage.getItem(TIME_KEY);
      if (getState != null) {
        setTime(JSON.parse(getState));
      }
    } catch(e) {
      // error reading value
      console.log(e);
    }
  }

  // Clearing the AsyncStorage. Will be useful for next time when we have to use ONE key to manage an ARRAY OF OBJECTS
  const clearTime = async () => {
    try {
      await AsyncStorage.clear();
      alert('Storage cleared successfully');
    } catch (e) {
      alert('Failed to clear local storage');
    }
  }

  // call this to read time when component mounts
  useEffect(() => {
    readTime();
  }, [])

  // call this to ensure that time and scheduling is saved properly on first click
  useEffect(() => {
    cancelBeforeAndSchedule();
    saveTime();
  }, [time]);

  const split_time = time.split(':'); // split by ':', because the hour and minute are separated that way
  const AM_PM = split_time[1].split(" ")[1];
  const hrs = Number(split_time[0]);
  const mins = Number(split_time[1].split(" ")[0]);
  // this works, but needs to be done twice for some reason...
  const cancelBeforeAndSchedule = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync()
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Mood Tracking",
        body: "Remember to do your mood tracking for today!"
      },
      trigger: { 
        hour: AM_PM === "PM" ? hrs + 12 : hrs, // converting to the correct 24h time, since Notifications does by hours
        minute: mins,
        repeats: true,
      }
    })
  }

  console.log(time);

  return (
    <View>
      <View style={styles.timeContainer}>
      <TouchableOpacity onPress={showTimepicker}>
        <Text style={styles.text}> Current reminder: {time} </Text>
      </TouchableOpacity>
      </View>
      <View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={false}
            display="default"
            onChange={onChange}
          />
        ) /* Can just ignore this entire thing. It's simply used to help open up the time picker*/}
      </View>
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
  
  timeContainer: { 
    borderWidth: 2, 
    borderColor: 'black', 
    borderRadius: 20, 
    backgroundColor: '#99EDC3', 
    height: 40, 
    width: 220, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  text: {
    fontSize: 14,
    color: '#4169e1',
    fontWeight: 'bold'
  }
});

export default SetNotifications;