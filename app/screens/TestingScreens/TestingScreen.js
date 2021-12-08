// the TestingScreen screen
import React from 'react';
import { ImageBackground, TouchableOpacity, StyleSheet, Text, View } from 'react-native';

// TestingScreen screen

// image is just a placeholder for now
const image = { uri: "https://reactjs.org/logo-og.png" };

const TestingScreen = ({navigation}) => {
    return( 
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.image}>
                <View> 
                    <Text> Testing Screen </Text> 
                </View>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('QuestionnaireBoxTest')}>
                    <Text> Questionnaire CheckBox </Text>
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

export default TestingScreen;