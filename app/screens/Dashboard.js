// the Dashboard screen
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, SafeAreaView, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Dashboard screen

// image is just a placeholder for now
const image = { uri: "https://reactjs.org/logo-og.png" };

// navigation may be used later so we keep it here for now.
const Dashboard = ({navigation}) => {
  const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
      console.log(e);
    }
  
    console.log('Done.')
  }
  

  return( 
      <SafeAreaView>
          <ImageBackground source={image} style={styles.image}>
              <SafeAreaView style={{ alignItems: 'center', justifyContent: 'center', flex: 0.2}}> 
                  <Text style={{ fontSize: 24, color: 'white'}}> Dashboard Screen </Text>
                  <Button title="Clear whole AsyncStorage" onPress={() => clearAll()}/>
              </SafeAreaView>
          </ImageBackground>
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
  button: { // default button, change later?
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginTop: 15
  },
  image: {
      width: "100%",
      height: "100%"
  }
});

export default Dashboard;