import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

// Services screen should navigate to other screens related to services
const Services = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Services screen</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Helplines')}>
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
    image: {
        width: "100%",
        height: "100%"
    }
});
  

export default Services;