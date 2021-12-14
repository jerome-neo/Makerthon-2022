import React, { useState } from 'react';
import { SafeAreaView, Text, Button, TextInput} from 'react-native';
import { auth } from '../firebase'
import { signInAnonymously, signOut, updateProfile } from 'firebase/auth';

const Login = ({navigation}) => {
    const [name, updateName] = useState("Rick");

    // sign in and update the username
    const signInAnon = () => {
        signInAnonymously(auth)
            .then(() => {
                console.log("Success"); 
                navigation.navigate('Chat');
                updateProfile(auth.currentUser, { displayName: name })
            })
            .catch(err => console.log(err));
    }

    const logout = () => {
        signOut(auth).then(() => {
            console.log("Signed out successfully");            
        }).catch((error) => {
            console.log(error);
        })
        console.log(auth.currentUser);
    }

    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
            <Text>Anonymous Login Screen</Text>
            <TextInput 
                style={{    
                    borderWidth: 2, 
                    color: 'black',
                    borderColor: 'black', 
                    borderRadius: 20, 
                    backgroundColor: '#99EDC3', 
                    height: 40, 
                    width: 220, 
                    textAlign: 'center',
                    alignItems: 'center', 
                    justifyContent: 'center'}}
                value={name}
                onChangeText={(text) => updateName(text)}
            />    
            <Button title="Sign In Anonymously" onPress={() => signInAnon()}/>
            <Button title="Get current display name" onPress={() => {
                if (auth.currentUser !== null) {
                    console.log(auth.currentUser.displayName)
                } else {
                    console.log('No current user.')
                }
            }}/>
            <Button title="Log out" onPress={() => {logout()}}/>
        </SafeAreaView>
    )
}

export default Login;