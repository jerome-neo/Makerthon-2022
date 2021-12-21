import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  SafeAreaView,
  ImageBackground,
} from "react-native";

const icons = require("../../icons/icons.js");
// Services screen should navigate to other screens related to services
const Services = ({ navigation }) => {
  return (
    <ImageBackground source={icons["BG_pic"]} style={styles.imageBg}>
      <Text>Services screen</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Helplines")}
      >
        <Text> Helplines </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
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

export default Services;
