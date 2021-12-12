import React from 'react';
import { Button, View, Alert } from 'react-native';

// toNav is a function. Pass it in the form of "() => navigation.navigate(...)"
const customAlert = (title, msg, toNav) => {
  Alert.alert(
      title,
      msg,
      [
          {
              text: "Cancel",
              onPress: () => Alert.alert("Cancel pressed"),
              style: "cancel"
          },
          {
            text: "OK",
            onPress: toNav,
            style: "default"
          }
      ],
  )
}

const AlertTest = ({ navigation }) => {
  return (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
      <Button title="Bring up alert" onPress={() => customAlert("test", "test message", () => navigation.goBack())}/>
    </View>
  );
}

export default AlertTest;