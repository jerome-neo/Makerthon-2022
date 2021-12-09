import React from 'react';
import { StyleSheet, Text, SafeAreaView, Linking, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements'


/*
- Send feedback links to an email
- About Us gives a brief overview of who we are, and what this app is for!
*/
const Settings = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <TouchableOpacity> 
              <Text> Some Timer Thingy </Text>
            </TouchableOpacity>
            <Button title="Send feedback" onPress={() => Linking.openURL('mailto:MK15@makerthon2022.com')}/>
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