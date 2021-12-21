import React from "react";
import { StyleSheet, Text, SafeAreaView, ImageBackground } from "react-native";

const icons = require("../../icons/icons.js");

const ResourcesMain = () => {
  return (
    <ImageBackground style={styles.container} source={icons["BG_pic"]}>
      <Text>Resources</Text>
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
});

export default ResourcesMain;
