import React from 'react';
import { SafeAreaView, Text, Button, ToastAndroid } from 'react-native';
import { auth } from '../firebase'
import { signInAnonymously } from 'firebase/auth';

const Login = () => {
    const signInAnon = () => {
        signInAnonymously(auth)
            .then(() => console.log("Success"))
            .catch(err => console.log(err));
    }

    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
            <Text>Anonymous Login Screen</Text>
            <Button title="Sign In Anonymously" onPress={() => signInAnon()}/>
        </SafeAreaView>
    )
}

export default Login;