import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { functions as x } from "../../firebase";
import { httpsCallable, getFunctions } from "firebase/functions";

export default function EmailTest() {
  const sendMail = httpsCallable(getFunctions(), "sendMail");
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button
        title="Click to send email"
        onPress={() =>
          sendMail({
            dest: "98lawweijie@gmail.com",
            msg: "Hello from Moodal App",
          })
            .then((s) => {
              console.log(s);
              console.log("Success");
            })
            .catch((e) => {
              console.error(`An error occurred: ${e}`);
            })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
