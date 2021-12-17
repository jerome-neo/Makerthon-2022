// Testing for the mood calendar

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as dateFn from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";
// need this so easy handling of icons
const icons = require("../../icons/icons.js");

// custom alert
const customAlert = (title, msg, accept, decline) => {
  Alert.alert(title, msg, [
    {
      text: "Decline",
      onPress: decline,
      style: "cancel",
    },
    {
      text: "Accept",
      onPress: accept,
      style: "default",
    },
  ]);
};

const todayDate = new Date(); // to be used for handling calendar back/front

// AsyncStorage keys
const PROMPT_KEY = "@prompt_key";

// Main body
const Mood = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [promptedDays, addPromptedDays] = useState([]);
  // addedMoods stores all the moods that have been added
  const state = useSelector((state) => state);
  const addedMoods = state.data;

  // <-------------------------------- AsyncStorage Stuff -------------------------------->
  const savePromptedDays = async () => {
    try {
      await AsyncStorage.setItem(PROMPT_KEY, JSON.stringify(promptedDays));
    } catch (e) {
      console.log(e);
    }
  };

  const readPromptedDays = async () => {
    try {
      const res = await AsyncStorage.getItem(PROMPT_KEY);
      if (res !== null) {
        addPromptedDays(JSON.parse(res));
      }
    } catch (e) {
      console.log(e);
    }
  };

  // all possible moods
  // empty is usual placeholder, then the rest follows the picking order
  const possible = [
    "mood_empty",
    "mood_happy",
    "mood_okay",
    "mood_calm",
    "mood_sad",
    "mood_stress",
    "mood_angry",
    "mood_anxious",
  ];

  // the months in the year
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  // console.log(iconState);
  // function to populate your array with the dates
  const generateMatrix = () => {
    let matrix = [];
    // Create header
    matrix[0] = weekDays;
    let year = date.getFullYear(); // a number
    let month = date.getMonth(); // a number
    for (let i = 0; i < 7; i++) {
      matrix[0][i] = {
        row: 0,
        col: i,
        day: weekDays[i],
        month: month,
        year: year,
        img: "not possible",
        key: weekDays[i] + "-" + month + "-" + year,
      };
    }

    // **any date function, returns you a number

    // first day of the month
    let firstDay = new Date(year, month, 1).getDay();
    let maxDays = nDays[month]; // max number of days for month, pre-defined
    if (month == 1) {
      // February
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
        matrix[row][col] = {
          row: row,
          col: col,
          day: -1,
          month: month,
          year: year,
          img: "not possible",
          dayString: weekDays[col].day,
          key: weekDays[col].day + "-1" + month + year,
        };
        if (row == 1 && col >= firstDay) {
          // Fill in rows only after the first day of the month
          matrix[row][col] = {
            row: row,
            col: col,
            day: counter++,
            month: month,
            year: year,
            img: possible[0],
            dayString: weekDays[col].day,
            key: weekDays[col].day + "-" + counter + "-" + month + "-" + year,
          };
        } else if (row > 1 && counter <= maxDays) {
          // Fill in rows only if the counter's not greater than
          // the number of days in the month
          matrix[row][col] = {
            row: row,
            col: col,
            day: counter++,
            month: month,
            year: year,
            img: possible[0],
            dayString: weekDays[col].day,
            key: weekDays[col].day + "-" + counter + "-" + month + "-" + year,
          };
        }
      }
    }
    return matrix;
  };

  // generate the matrix
  let matrix = generateMatrix();
  let rows = [];
  let moodyDays = 0;
  // from Redux state, we know which dates are occupied.
  // so, we use that information to update our calendar on every render
  const updateMatrix = (moods, matrix) => {
    moods.forEach((moodObject) => {
      const row = moodObject.row;
      const col = moodObject.col;
      const moodIndex = moodObject.moodIndex;
      const month = moodObject.month;
      const mood = moodObject.moodIndex;
      if (mood >= 4) {
        moodyDays++;
      } else {
        moodyDays = 0;
      }
      if (matrix[row][col].month === month) {
        matrix[row][col].img = possible[moodIndex];
      }
    });
  };

  // update matrix before each re-render
  updateMatrix(addedMoods, matrix);
  // console.log(addedMoods);
  const declineHandler = (submit) => {
    Alert.alert(
      "Declined", // title
      "That's OK! Meanwhile, here's some resources which may help you to feel better", // message
      submit // on accept
    );
  };

  const acceptHandler = () => {
    navigation.navigate("Questionnaire");
  };

  // <-------------------------------- Prompt Handling Stuff --------------------------------->
  let shouldPrompt = false;
  console.log(moodyDays);
  if (moodyDays >= 5) {
    shouldPrompt = true;
  }
  // needs to add more logic here.
  const prompter = () => {
    const formatted = dateFn.lightFormat(todayDate, "yyyy-MM-dd");
    if (
      shouldPrompt &&
      !promptedDays.some((someDate) => someDate === formatted)
    ) {
      addPromptedDays([...promptedDays, formatted]);
      console.log(promptedDays);
      customAlert(
        "Important",
        "Hey, we noticed you haven't been feeling the best lately, please help us to answer some questions so we know how we can help :)",
        () => {
          acceptHandler();
        },
        () => {
          declineHandler(navigation.navigate("Resources"));
        }
      );
      // if accepted, then reset counter
    }
  };

  // conditionally render the icons
  const _renderIcons = (item, rowIndex) => {
    if (item.day !== -1 && rowIndex !== 0) {
      if (item.month < todayDate.getMonth())
        return (
          <Image style={{ width: 40, height: 50 }} source={icons[item.img]} />
        );
      else {
        if (item.day <= todayDate.getDate()) {
          return (
            <Image style={{ width: 40, height: 50 }} source={icons[item.img]} />
          );
        }
      }
    } else {
      return;
    }
  };

  // do this on every render
  rows = matrix.map((row, rowIndex) => {
    let rowItems = row.map((item, colIndex) => {
      return (
        <TouchableOpacity
          style={{
            // needs to use ternary ops, so no choice but to do inline styling
            // note, change the background colour to be different in order to see the size of pressable box.
            flex: 1,
            height: rowIndex === 0 ? 20 : 60, // conditionally rendering the height. If it is the days of the week, then lower.
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
            // Highlight header
            backgroundColor: rowIndex === 0 ? "#ddd" : "white", // if days of week, grey bg
            // Highlight Sundays
            // Highlight current date
            fontSize: 18,
          }}
          onPress={() =>
            rowIndex === 0 || item.day === -1 || item.day > todayDate.getDate()
              ? console.log(todayDate.getDate())
              : navigation.navigate("MoodSelector", { item: item })
          }
          key={item.key}
        >
          {_renderIcons(item, rowIndex)}
          <Text
            style={{
              color: colIndex === 0 && rowIndex === 0 ? "#a00" : "#000",
            }}
          >
            {rowIndex === 0 // if it row 0, which are the days
              ? item.day // render it
              : item.day !== -1 && item.month < todayDate.getMonth() // if not, check if these conditions are met
              ? item.day // render everything if it is a past month
              : item.day <= todayDate.getDate() && item.day !== -1 // if it is current month, render only those that are before today, and before
              ? item.day
              : ""}
          </Text>
        </TouchableOpacity>
      );
    });
    return <View style={styles.rowItems}>{rowItems}</View>;
  });

  // retrieves item based on the days of the week, and today's date
  const retrieveItem = () => {
    let item = "";
    const col = todayDate.getDay();
    const currentDay = todayDate.getDate();
    for (let i = 0; i < 7; i++) {
      if (matrix[i][col].day === currentDay) {
        return matrix[i][col];
      }
    }
  };

  const changeMonth = (n) => {
    const curr = dateFn.addMonths(date, n);
    // prevent going forward if the next date is greater than today's date
    if (
      dateFn.lightFormat(curr, "yyyy-MM-dd") >
      dateFn.lightFormat(todayDate, "yyyy-MM-dd")
    ) {
      return;
    }
    return setDate(curr);
  };

  useEffect(() => {
    readPromptedDays();
  }, []);

  useEffect(() => {
    savePromptedDays();
  }, [promptedDays]);

  return (
    <SafeAreaView style={styles.moodCalendar}>
      <SafeAreaView style={styles.moodCalendarHeader}>
        <TouchableOpacity onPress={() => changeMonth(-1)}>
          <Image style={styles.arrowImage} source={icons["arrow_L"]} />
        </TouchableOpacity>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 30,
            textAlign: "center",
          }}
        >
          {months[date.getMonth()]} &nbsp;
          {date.getFullYear()}
        </Text>
        <TouchableOpacity onPress={() => changeMonth(1)}>
          <Image
            style={styles.arrowImage}
            source={
              dateFn.getMonth(date) === todayDate.getMonth()
                ? null // render nothing if it is past today's date
                : icons["arrow_R"]
            }
          />
        </TouchableOpacity>
      </SafeAreaView>
      {rows}
      <View style={styles.floatView}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("MoodSelector", { item: retrieveItem() });
          }}
        >
          <Image source={icons["float_button"]} style={styles.floatButton} />
        </TouchableOpacity>
      </View>
      <Button
        title="Get state"
        onPress={() => {
          console.log(state);
        }}
      />
      <Button
        title="Get added dates"
        onPress={() => console.log(promptedDays)}
      />
      {prompter()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  moodCalendar: {
    backgroundColor: "white",
    flex: 1,
  },

  moodCalendarHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },

  arrowImage: {
    marginTop: 2.5,
    height: 25,
    width: 50,
  },

  rowItems: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
    alignItems: "center",
  },

  floatButton: {
    height: 100,
    width: 100,
  },

  floatView: {
    flex: 1,
    position: "absolute",
    right: 25,
    bottom: 50,
  },
});

export default Mood;
