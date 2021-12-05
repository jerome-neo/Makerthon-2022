import React from 'react';
import { ImageBackground, TouchableOpacity, Image, StyleSheet, Text, SafeAreaView, Linking } from 'react-native';

/**
 * To do:
 * 1) Change to actual proper helplines, complete with logos.
 */

const icons = require('../icons/icons.js');

// find more suitable image
const image = { uri: "https://reactjs.org/logo-og.png" };

// contains all the numbers
const makeCallableIcon = (number, image) => {
  // add more numbers here!
  return (
    <TouchableOpacity onPress={() => Linking.openURL(`tel: ${number}`)}>
      <Image style={styles.image} source={image}/>
    </TouchableOpacity>
  );
}


const Helplines = () => {
    return (
        <SafeAreaView>
          <ImageBackground style={{ width: '100%', height: '100%' }} source={image}>
              <SafeAreaView style={styles.container}>
                <SafeAreaView style={styles.bundle}>
                  { makeCallableIcon("+6512345678", icons['placeholder']) }
                  { makeCallableIcon("+6512345678", icons['placeholder']) }
                </SafeAreaView>
                <SafeAreaView style={styles.bundle}>
                  { makeCallableIcon("+6512345678", icons['placeholder']) }
                  { makeCallableIcon("+6512345678", icons['placeholder']) }
                </SafeAreaView>
              </SafeAreaView>
          </ImageBackground>
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginBottom: 'auto', 
      justifyContent: 'center', 
      alignItems: 'center',
    },

    image: {
      marginTop: 25,
      width: 125,
      height: 125,
      marginLeft: 15, 
      marginRight: 15
    },

    bundle: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center',
    }
    
  });
  

export default Helplines;