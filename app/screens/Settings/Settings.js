import React from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, Switch, Linking, View } from 'react-native';
import { Button } from 'react-native-elements'

// local imports
import { SetNotifications } from '../../CustomComponents'

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
            <SetNotifications/>
            <View style={{marginBottom: 10,}}>
              <Button title="Send feedback" onPress={() => { Linking.openURL('mailto:MK15@makerthon2022.com?subject=Feedback')}}/>
            </View>
            <Button title="About Us" onPress={() => navigation.navigate('About')}/> 
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