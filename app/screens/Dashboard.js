// the Dashboard screen
import React from 'react';
import { ImageBackground, TouchableOpacity, StyleSheet, Text, View } from 'react-native';

// Dashboard screen

// image is just a placeholder for now
const image = { uri: "https://reactjs.org/logo-og.png" };

const Dashboard = ({navigation}) => {
    return( 
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.image}>
                <View> 
                    <Text> Dashboard Screen </Text> 
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
            </ImageBackground>
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
  image: {
      width: "100%",
      height: "100%"
  }
});

export default Dashboard;