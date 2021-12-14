// Component that allows users to select a time for their daily notifications.
// Need to add an option to turn off notifications

import React, { useState, useEffect } from 'react';
import { Button, TouchableOpacity, StyleSheet, Text, View, Switch } from 'react-native';
import * as Notifications from 'expo-notifications'; // REQUIRED. Need this for all things related to Notifications from Expo
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const TIME_KEY = "@time_key";
const NOTIFS_SWITCH_KEY = "@switch_key";

// First, we test AsyncStorage
const SetNotifications = () =>  {
  // Define your time with hooks. We use this as the default time. This is a string used to display time only.
  const [time, setTime] = useState("12:34");

  // Switch's hook
  const [toggle, setToggle] = useState(false);

  // <------------------------------------ DateTimePicker stuff ------------------------------------->
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

  // <------------------------------------ DateTimePicker stuff end ------------------------------------->


  // <------------------------------------ Async Storage Stuff ------------------------------------->
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
      const getTime = await AsyncStorage.getItem(TIME_KEY);
      if (getTime !== null) {
        setTime(JSON.parse(getTime));
      }
    } catch(e) {
      // error reading value
      console.log(e);
    }
  }
  
  const saveToggle = async () => {
    try {
      await AsyncStorage.setItem(NOTIFS_SWITCH_KEY, JSON.stringify(toggle));
    } catch (e) {
      console.log(e);
    }
  }

  const readToggle = async () => {
    try {
      const getToggle = await AsyncStorage.getItem(NOTIFS_SWITCH_KEY);
      if (getToggle !== null) {
        setToggle(JSON.parse(getToggle));
      } 
    } catch (e) {
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

  // <------------------------------------ AsyncStorage stuff end ------------------------------------->

  // <------------------------------------ Toggle stuff ------------------------------------->
  
  let displayText = "";
  if (toggle) {
    // toggle is TRUE. So it is on
    displayText = "Current reminder: " + time;
    // Settings for notifications
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  } else {
    displayText = "Notifications are turned off";
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: false,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  }
  const toggleSwitch = () => {
    setToggle(prevState => !prevState);
  }

  // <------------------------------------ Mounting stuff ------------------------------------->
  useEffect(() => {
    readTime();
    readToggle();
  }, [])

  // call this to ensure that time and scheduling is saved properly on first click
  useEffect(() => {
    cancelBeforeAndSchedule();
    saveTime();
    saveToggle();
  }, [time, toggle]);


  // <------------------------------------ Notifications logic  ------------------------------------->
  const split_time = time.split(':'); // split by ':', because the hour and minute are separated that way
  const AM_PM = split_time[1].split(" ")[1];
  const hrs = Number(split_time[0]);
  const mins = Number(split_time[1].split(" ")[0]);
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
  // remove comment if you want to do some debugging
  // console.log(time);
  return (
    <View style={{flexDirection: 'row'}}>
      <View style={styles.timeContainer}>
        <TouchableOpacity onPress={showTimepicker}>
          <Text style={styles.text}> {displayText} </Text>
        </TouchableOpacity>
      </View>
      <Switch
        onValueChange={toggleSwitch}
        value={toggle}
      />
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