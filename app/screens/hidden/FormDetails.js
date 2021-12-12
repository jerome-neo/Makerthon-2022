import React, { useState, useEffect } from 'react'
import { Alert, TextInput, SafeAreaView, Text, StyleSheet, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';


// function to check char is indeed a character
function isCharacterALetter(char) {
  return (/[a-zA-Z]/).test(char)
}


// AsyncStorage keys. One for name, student number and email.
// AsyncStorage stores on local storage (their phones). So there should be no issues with this.
const DETAILS = "@user_details";
// easy referencing
const NAME = 0;
const NUM = 1;
const EMAIL = 2;
// We also need to disable the hardware back press to discourage users from backing out.
const FormDetails = ({ navigation }) => {
  const [details, setDetails] = useState(['Rick Astley', 'A0123456B', 'nusnet@u.nus.edu']);
  // console.log(details);

  /* AsyncStorage stuff now */
  const saveDetails = async () => {
    try {
      await AsyncStorage.setItem(DETAILS, JSON.stringify(details));
    } catch (e) {
      // error handling
      console.log(e);
    }
  }

  const readDetails = async () => {
    try {
      const read = await AsyncStorage.getItem(DETAILS);
      if (read !== null) {
        setDetails(JSON.parse(read));
      }
    } catch (e) {
      // error handling
      console.log(e);
    }
  }

  // Clearing the AsyncStorage. Will be useful for next time when we have to use ONE key to manage an ARRAY OF OBJECTS
  const clearDetails = async () => {
    try {
      await AsyncStorage.removeItem(DETAILS); // removes DETAILS key from storage
      alert('Storage cleared successfully');
    } catch (e) {
      alert('Failed to clear local storage');
    }
  }
  /* End AsyncStorage stuff*/

  /* Updates stuff */
  // Need to copy the array, then value of array to be that new array. Otherwise, won't work.
  const updateArray = (index, text) => {
    let newArr = [...details]; // First, copy the array
    newArr[index] = text; // Set the correct field to the new text value
    console.log(newArr[index]); // Checking. Can remove this statement
    setDetails(newArr);
  }

  // Disable hardware back press.
  // Probably need to check if this causes any issues on iOS
  useEffect(() => {
    readDetails();
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => backHandler.remove()
  }, [])

  useEffect(() => {
    saveDetails();
  }, [details])

  const checkMail = () => {
    let split_string = details[2].split("@");
    let nusnet = split_string[0];
    let back = split_string[1];
    return (nusnet.length === 8) 
            ? back === "u.nus.edu" 
            : false;
  }


  const customAlert = (title, msg, accept, decline) => {
    Alert.alert(
        title,
        msg,
        [
            {
                text: "Back",
                onPress: decline,
                style: "cancel"
            },
            {
              text: "I do not want help",
              onPress: accept,
              style: "default"
            }
        ],
    )
  }

  // Contains all the functions necessary to handle submit
  // These are:
  // 1) Check if name is empty
  // 2) Check if student number is the correct format
  // 3) Check if email is the correct format
  // These can be easily checked next time if it were to be integrated into NUS internal server. We can simply filter and match students' provided details
  // with whatever is already in the database, and make sure all 3 of them match.
  // Furthermore, takes an argument, action, which should do:
  // 1) Send an email
  // 2) Navigate to home screen (dashboard)
  const handleSubmit = (action) => {
    // Student number is only 9 characters long
    const checkStudentNumber = () => {
      if (details[1].length !== 9) {
        return false;
      }
      let start = details[1].charAt(0);
      let end = details[1].charAt(8);
      if (start !== "A") {
        return false;
      }

      if (!isCharacterALetter(end)) {
        return false;
      }

      let middle = details[1].substring(1, 8); // get 2nd letter to 8th letter. 

      return !Number.isNaN(Number(middle))
    }

    const checkName = () => {
      return !(details[0] === "");
    }

    let isMailOK = checkMail();
    let isNumberOK = checkStudentNumber();
    let isNameOK = checkName();
    if (isMailOK && isNumberOK && isNameOK) {
      Alert.alert(
        "Success", 
        "An appointment has been booked. Please check your email",
        [{
          text: "OK",
          onPress: action
        }]
      )
    } else if (!isMailOK) {
      Alert.alert("Wrong format", "Check your email");
    } else if (!isNumberOK) {
      Alert.alert("Wrong format", "Please check your student number");
    } else if (!isNameOK) {
      Alert.alert("Empty name", "Please fill in your name");
    }
  }


  const declineHandler = (submit) => {
    Alert.alert(
        "Declined", // title
        "We still strongly recommend you to seek help. Meanwhile, here's a list of resources you can use", // message
        submit // on accept
    )
  }

  // Need to decide whether cancel button should exist or not. Will have to pass navigation into this so we can navigate to next step
  const handleCancel = (screenToNavigateTo) => {
    customAlert(
      "Are you sure?",
      "It is strongly recommended to visit UCS for help",
      screenToNavigateTo,
      ""
    )
  }

  // Need to add checks to ensure the form is properly filled.
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={{marginTop: 10}}>
        <Text style={{fontSize: 24, color: 'grey', fontWeight: 'bold', }}>Consent Form</Text>
      </SafeAreaView>

      <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text> Fill in your name: </Text>
        <TextInput
          onChangeText={(text) => updateArray(NAME, text)}
          value={details[0]}
          style={styles.inputContainer}
        />
        <Text> Fill in your student number: </Text>
        <TextInput
          onChangeText={(text) => updateArray(NUM, text)}
          value={details[1]}
          style={styles.inputContainer}
        />
        <Text> Fill in your NUSNET email: </Text>
        <TextInput
          onChangeText={(text) => updateArray(EMAIL, text)}
          value={details[2]}
          style={styles.inputContainer}
        />
      </SafeAreaView>
      
      <SafeAreaView style={{marginBottom: 20, flexDirection: 'row'}}>
        <SafeAreaView style={{marginRight: 90, width: '25%'}}>
          <Button title="Cancel" onPress={() => handleCancel(() => declineHandler(navigation.navigate('Resources')))}/>
        </SafeAreaView>
        <SafeAreaView style={{marginLeft: 90, width: '25%'}}>
          <Button title="Submit" onPress={() => handleSubmit(() => {
            // Do the email sending here.
            // What I'm expecting is that, we'll send an email from the server-side to UCS, with the student's details.
            // Only security concern here is that, since we're sending from our server side and not the student's personal email, it is easy for
            // a malicious actor that's monitoring our server's traffic to intercept potentially every single student's email's being sent.
            // The upside is that, doing it from server-side ensures that the emails get sent through. If it were from the students' side, they could
            // easily cancel the sending via their own email app. But, we'll assume that this will not happen since they have already pressed "submit".
            Alert.alert("Placeholder", "Email sent for tele-medicine appointment.");
            navigation.navigate('Dashboard');
          })}/>
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },

  inputContainer: {
    borderWidth: 2, 
    color: 'black',
    borderColor: 'black', 
    borderRadius: 20, 
    backgroundColor: '#99EDC3', 
    height: 40, 
    width: 220, 
    textAlign: 'center',
    alignItems: 'center', 
    justifyContent: 'center'
  }
})

export default FormDetails;
