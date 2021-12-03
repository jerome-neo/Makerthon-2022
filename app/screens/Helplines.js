import React from 'react';
import { StyleSheet, Text, SafeAreaView, Linking } from 'react-native';

/**
 * To do:
 * 1) Change to actual proper helplines, complete with logos. No need to specify the phone number to user
 * 2) Background images
 * 3) Maybe change to pressable "boxes" instead
 */


// contains all the numbers
const numbers = () => {
  // add more numbers here!
  return (
    <SafeAreaView style={styles.center}>
      <Text style={styles.text}> UHC1: <Text style={styles.phoneNumber} onPress={() => Linking.openURL('tel: +6512345678')}>Removable --> +65 1234 5678</Text> </Text>
      <Text style={styles.text}> UHC2: <Text style={styles.phoneNumber} onPress={() => Linking.openURL('tel: +6512345678')}>+65 1234 5678</Text> </Text>
      <Text style={styles.text}> UHC3: <Text style={styles.phoneNumber} onPress={() => Linking.openURL('tel: +6512345678')}>+65 1234 5678</Text> </Text>
      <Text style={styles.text}> UHC4: <Text style={styles.phoneNumber} onPress={() => Linking.openURL('tel: +6512345678')}>+65 1234 5678</Text> </Text>
      <Text style={styles.text}> UHC5: <Text style={styles.phoneNumber} onPress={() => Linking.openURL('tel: +6512345678')}>+65 1234 5678</Text> </Text>
    </SafeAreaView>
  );
}


const Helplines = () => {
    return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.header}>Helplines screen</Text>
          { numbers() }
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    phoneNumber: {
      fontSize: 24,
      fontWeight: 'bold',
      textDecorationLine: 'underline',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      textAlignVertical: 'top',
      fontSize: 24,
    },
    center: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
  

export default Helplines;