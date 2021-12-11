import React from 'react';
import { SafeAreaView, Text, StyleSheet} from 'react-native';

const About = () => { 
    return (
        <SafeAreaView style={styles.text}>
            <Text> About Us </Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    text: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
        color: 'black',
    }
})

export default About;