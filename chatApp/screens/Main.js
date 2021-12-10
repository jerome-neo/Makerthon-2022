import React, { useState } from 'react';
import { SafeAreaView, Text } from 'react-native';

const Main = ({ navigation }) => {
    return (
        <SafeAreaView>
            <Text onPress={() => navigation.navigate('Chat')}> Go to chat </Text>
        </SafeAreaView>
    );
}



export default Main;