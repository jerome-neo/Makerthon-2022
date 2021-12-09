import React from 'react';
import { StyleSheet } from 'react-native';
import { Dashboard, Mood, MoodSelector, ResourcesMain, Services, Settings, Helplines, Questionnaire } from './screens';

import { TestingScreen, QuestionnaireBoxTest, } from './screens'; // this entire line will be used for testing components and other functionalities

import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';

// local imports
import moodStore from './redux/mood/store'


const setNameFromRouteName = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);

  switch (routeName) {
    case 'Resources':
      return 'Resources';
    case 'Dashboard':
      return 'Dashboard';
    case 'SettingsStack':
      return 'Settings';
  }
}


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
const SubMoodStack = () => {
  return (
    <Provider store={moodStore}>
      <Stack.Navigator>
        <Stack.Screen component={Mood} name="Mood" options={{title: 'Mood Journal'}}/>
        <Stack.Screen component={MoodSelector} name="MoodSelector" options={{title: 'Select mood'}}/>
      </Stack.Navigator>
    </Provider>
  )
}

// Questionnaire needs to be aware of:
// 1) Resources
// 2) PFA
// 3) Counsel
// 4) Form + Psych
const QuestionnaireStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Questionnaire} name="Questionnaire" options={{headerShown: false}}/>
      <Stack.Screen component={Resources} name="Resources" options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

// SubMoodStack needs access to Questionnaire
// Questionnaire needs access to Resources
const FullMoodStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={SubMoodStack} name="SubMoodStack" options={{headerShown: false}}/>
      <Stack.Screen component={QuestionnaireStack} name="QuestionnaireStack" options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

// contains all the resources stuff. Add exercises, face massage, etc...
const Resources = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={ResourcesMain} name="ResourcesMain" options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

// contains all the Services stuff
const ServicesStack = () => {
  return (
    <Stack.Navigator initialRouteName="ServicesScreen">
      <Stack.Screen component={Services} name="Services"/>
      <Stack.Screen component={Helplines} name="Helplines"/>
    </Stack.Navigator>
  )
}

// contains the Settings stuff
const SettingsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Settings} name="SettingsScreen" options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

// **Remember to change dailyReset when the time comes :)
const Bottoms = () => {
  return (
  <BottomTabs.Navigator initialRouteName={ dailyReset === true ? "FullMoodStack" : "Dashboard"}>
    <BottomTabs.Screen component={Resources} name="Resources"/>
    <BottomTabs.Screen component={SubMoodStack} name="SubMoodStack" options={{headerShown: false}}/>
    <BottomTabs.Screen component={Dashboard} name="Dashboard"/>
    <BottomTabs.Screen component={ServicesStack} name="ServicesStack" options={{headerShown: false}}/>
    <BottomTabs.Screen component={SettingsStack} name="Settings"/>
    <BottomTabs.Screen component={TestingStack} name="TestingStack" options={{headerShown: false}}/>
  </BottomTabs.Navigator>);
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={Bottoms} name="Bottoms" options={({ route }) => ({
          title: setNameFromRouteName(route),
          headerShown: false
        })}/>
        <Stack.Screen component={QuestionnaireStack} name="QuestionnaireStack" options={{headerShown: true}} /*  Set to false later */ />
      </Stack.Navigator>
    </NavigationContainer>
  )
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