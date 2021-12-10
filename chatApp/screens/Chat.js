import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';


const Chat = () => {
    const [messages, changeMessages] = useState([]);

    // to push to array do smth like: changeMessages(old => [...old, new])
     useEffect(() => {
        // componentDidMount
        Fire.shared.on(newMessage => {
            changeMessages(() => [...messages, newMessage])
        })

        
        // componentWillUnmount
        return () => {
            Fire.shared.off;y
        }
    })

    return (
        <GiftedChat
            messages={messages}
        />
    );
}

export default Chat;