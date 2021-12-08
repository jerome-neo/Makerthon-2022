import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dashboard, Mood, MoodSelector, Resources, Services, Settings, Helplines } from './screens';

import { TestingScreen, QuestionnaireBoxTest, } from './screens'; // this entire line will be used for testing components and other functionalities

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';

// local imports
import moodStore from './redux/mood/store'

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();
const dailyReset = false; // change to redux state later on

// For testing. Remove next time when all testing is finished
const TestingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={TestingScreen} name="TestingScreen"/>
      <Stack.Screen component={QuestionnaireBoxTest} name="QuestionnaireBoxTest" options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}

// contains the mood stuff
const MoodStack = () => {
  return (
    <Provider store={moodStore}>
      <Stack.Navigator>
        <Stack.Screen component={Mood} name="Mood" options={{headerShown: false}}/>
        <Stack.Screen component={MoodSelector} name="MoodSelector" options={{headerShown: false}}/>
      </Stack.Navigator>
    </Provider>
  )
}

// contains all the resources stuff
const ResourcesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Resources} name="ResourcesScreen" options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

// contains all the Services stuff
const ServicesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Services} name="ServicesScreen" options={{headerShown: false}}/>
      <Stack.Screen component={Helplines} name="Helplines"/>
    </Stack.Navigator>
  )
}

// contains the Settings stuff
const SettingsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Settings} name="SettingsScreen"/>
    </Stack.Navigator>
  )
}

const App = () => {
  return (
      <NavigationContainer>
        <BottomTabs.Navigator initialRouteName={ dailyReset === true ? "MoodStack" : "Dashboard"}>
          <BottomTabs.Screen component={ResourcesStack} name="Resources"/>
          <BottomTabs.Screen component={MoodStack} name="MoodStack"/>
          <BottomTabs.Screen component={Dashboard} name="Dashboard"/>
          <BottomTabs.Screen component={ServicesStack} name="Services"/>
          <BottomTabs.Screen component={SettingsStack} name="Settings"/>
          <BottomTabs.Screen component={TestingStack} name="TestingStack" options={{headerShown: false}}/>
        </BottomTabs.Navigator>
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