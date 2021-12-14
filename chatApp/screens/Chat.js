import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';

import { TouchableOpacity, Text, BackHandler, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import { collection, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth' // use to logout user.
import { auth, database } from '../firebase'



const logout = () => {
    signOut(auth).then(() => {
        console.log("Signed out successfully");            
    }).catch((error) => {
        console.log(error);
    })
    console.log(auth.currentUser);
}

const Chat = ({ navigation }) => {
    // hooks to send and update messages
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => logout());
        return () => backHandler;
    })

    useLayoutEffect(() => {
        const collectionRef = collection(database, 'chats');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));
    
        const unsubscribe = onSnapshot(q, querySnapshot => {
          setMessages(
            querySnapshot.docs.map(doc => ({
              _id: doc.data()._id,
              createdAt: doc.data().createdAt.toDate(),
              text: doc.data().text,
              user: doc.data().user
            }))
          );
        });
    
        return unsubscribe;
    });

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, messages)
        );
        const { _id, createdAt, text, user } = messages[0];    
        addDoc(collection(database, 'chats'), {
          _id,
          createdAt,
          text,
          user
        });
      }, []);

    return (
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={messages => onSend(messages)}
            user={{
                _id: auth.currentUser.displayName === null ? Math.random() : auth.currentUser.displayName,
                avatar: 'https://i.pravatar.cc/300'
            }}
        />
    )
}

export default Chat;
