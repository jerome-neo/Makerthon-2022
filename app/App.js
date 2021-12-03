import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Main, Helplines, Mood, MoodSelector, Shop, Support } from './screens';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './redux/mood/store'

const Stack = createNativeStackNavigator();
const MoodStack = () => {
  return (
    <Provider store={store}>
      <Stack.Navigator>
        <Stack.Screen component={Mood} name="Mood"/>
        <Stack.Screen component={MoodSelector} name="MoodSelector"/>
      </Stack.Navigator>
    </Provider>
  )
}

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen component={Main} name="Main"/>
          <Stack.Screen component={MoodStack} name="MoodStack" options={{headerShown: false}}/>
          <Stack.Screen component={Shop} name="Shop"/>
          <Stack.Screen component={Support} name="Support"/>
          <Stack.Screen component={Helplines} name="Help Centre"/>
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