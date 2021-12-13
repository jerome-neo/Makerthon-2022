import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Chat, Login } from './screens';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={Login} name="Login"/>
        <Stack.Screen component={Chat} name="Chat"/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;