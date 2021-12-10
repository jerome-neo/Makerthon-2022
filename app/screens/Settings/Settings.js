import React from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Button } from 'react-native-elements'

// Needs react-native-email-link
/*
- Send feedback links to an email. Note that this does not work in a simulator, so try on actual device.
- About Us gives a brief overview of who we are, and what this app is for!
*/

import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// find a way to call notifications daily from here

const Settings = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <TouchableOpacity> 
              <Text> Some Timer Thingy </Text>
            </TouchableOpacity>
            <Button title="Send feedback" onPress={() => { Linking.openURL('mailto:MK15@makerthon2022.com?subject=Feedback')}}/>
            <Button title="About Us" onPress={() => navigation.goBack() /* Leaving it as this for now. Update to another page next time :)*/}/> 
          </ScrollView>
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default Settings;