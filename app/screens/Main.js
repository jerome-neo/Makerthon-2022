// the main screen
import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

// main screen, needs to navigate to all the other screens
/*
Screens:
Mood
Shop
Support
Helplines
*/

const Main = ({navigation}) => {
    return( 
        <View style={styles.main}>
            <View> 
                <Text> Main Screen </Text> 
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MoodStack')}>
                <Text> Mood </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Shop')}>
                <Text> Shop </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Support')}>
                <Text> Support </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Help Centre')}>
                <Text> Helplines </Text>
            </TouchableOpacity>
        </View>
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
});

export default Main;