import React, { useState, createContext, useContext, useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { signOut } from 'firebase/auth' // use to logout user.
import { Chat, Login } from './screens';

const Stack = createNativeStackNavigator();

const logout = () => {
  signOut(auth).then(() => {
      console.log("Signed out successfully");            
  }).catch((error) => {
      console.log(error);
  })
  console.log(auth.currentUser);
}


const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen component={Login} name="Login"/>
          <Stack.Screen component={Chat} name="Chat" options={{ 
            headerLeft: () => (<TouchableOpacity></TouchableOpacity>),             
            headerRight: () => (
                <TouchableOpacity 
                    style={{marginRight: 18}}
                    onPress={logout}>
                    <Text style={{fontSize: 20}}>Exit</Text>
                </TouchableOpacity>),
            title: "Anonymous Chatroom"
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
  )
}

export default App;