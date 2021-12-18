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
const image = { uri: "https://reactjs.org/logo-og.png" };
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
  const moodState = useSelector((state) => state);
  const moodsData = moodState.data;
  const logPoints = moodState.logPoints;
  return (
    <SafeAreaView>
      <ImageBackground source={image} style={styles.image}>
        <SafeAreaView
          style={{ alignItems: "center", justifyContent: "center", flex: 0.2 }}
        >
          <Text style={styles.text}>
            Points accumulated so far: {logPoints}
          </Text>
          <Text style={styles.text}>Dashboard Screen</Text>
          <Button
            title="Show data on console"
            onPress={() => console.log(moodState)}
          />
          <Button title="Clear whole AsyncStorage" onPress={() => clearAll()} />
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaView>
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
    color: "white",
  },
  button: {
    // default button, change later?
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginTop: 15,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default Dashboard;
