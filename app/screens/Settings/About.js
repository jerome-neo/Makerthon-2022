import React from 'react';
import { Text } from 'react-native';

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
        fontSize: 24,
        color: 'black',
    }
})

export default About;