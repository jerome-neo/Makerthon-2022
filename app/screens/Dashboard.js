// the Dashboard screen
import React, { useState } from 'react';
import { ImageBackground, TouchableOpacity, StyleSheet, Text, SafeAreaView, Button,} from 'react-native';

// Dashboard screen

// image is just a placeholder for now
const image = { uri: "https://reactjs.org/logo-og.png" };


const Dashboard = ({navigation}) => {
  const [number, increaseNumber] = useState(0);

    return( 
        <SafeAreaView>
            <ImageBackground source={image} style={styles.image}>
                <SafeAreaView style={{ alignItems: 'center', justifyContent: 'center', flex: 0.2}}> 
                    <Text style={{ fontSize: 24, color: 'white'}}> Dashboard Screen </Text>
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