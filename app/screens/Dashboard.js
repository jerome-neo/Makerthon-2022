// the Dashboard screen
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  ImageBackground,
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Dashboard screen

// image is just a placeholder for now
const icons = require("../icons/icons.js");
const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
    console.log(e);
  }

  console.log("Done.");
};

// navigation may be used later so we keep it here for now.
const Dashboard = ({ navigation }) => {
  // Note that if we want to update anything related to the state, we have to directly call user_state.(dataType) = ....
  // However, this will not be saved in AsyncStorage as no explicit call to Reducer was made.
  const user_state = useSelector((state) => state);
  const moodsData = user_state.data;
  const logPoints = user_state.logPoints;

  return (
    <ImageBackground source={icons["BG_pic"]} style={styles.imageBg}>
      <SafeAreaView
        style={{ alignItems: "center", justifyContent: "center", flex: 0.2 }}
      >
        <Text style={styles.text}>Points accumulated so far: {logPoints}</Text>
        <Text style={styles.text}>Dashboard Screen</Text>
        <Button
          title="Show data on console"
          onPress={() => console.log(user_state)}
        />
        <Button title="Clear whole AsyncStorage" onPress={() => clearAll()} />
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    color: "black",
  },
  button: {
    // default button, change later?
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginTop: 15,
  },
  imageBg: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});

export default Dashboard;
