import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Main, Helplines, Mood, Shop, Support } from './screens';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={Main} name="Main"/>
        <Stack.Screen component={Mood} name="Mood"/>
        <Stack.Screen component={Shop} name="Shop"/>
        <Stack.Screen component={Support} name="Support"/>
        <Stack.Screen component={Helplines} name="Helplines"/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default App;