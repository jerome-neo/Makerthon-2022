import * as firebase from 'firebase';


class Fire {
  constructor() {
    this.init();
    this.observeAuth();
  }

  init = () =>
    firebase.initializeApp({
        apiKey: "AIzaSyDv0jYKulKGKIFoqD8uE9V-dIhTEryUCBQ",
        authDomain: "chatapp-b438c.firebaseapp.com",
        projectId: "chatapp-b438c",
        storageBucket: "chatapp-b438c.appspot.com",
        messagingSenderId: "377388443445",
        appId: "1:377388443445:web:6c87a7909ff12450928e7c",
        measurementId: "${config.measurementId}"
    });

    observeAuth = () => {
        auth().onAuthStateChange(this.onAuthStateChange);
    }

    onAuthStateChange = (user) => {
        if (!user) {
            try {
                firebase.auth().signInAnonymously();
            } catch ({message}) {
                alert(message);
            }
        }
    }

    get ref() {
        return firebase.database().ref('messages');
    }

    // gets last 20 messages
    on = callback => {
        this.ref.limitToLast(20).on('child_added', snapshot => callback(this.parse(snapshot)))
    }

    parse = (snapshot) => {
        const { timestamp: numberStamp, text, user } = snapshot.val();
        const { key: _id } = snapshot;

        const timestamp = new Date(numberStamp);

        const message = {
            _id,
            timestamp,
            text,
            user    
        }

        return message;
    }

    off() {
        this.ref.off();
    }

    // helper to get uid
    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    // get accurate timestamp from server
    get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
    }

    // function that takes in an array of messages and loop thru messages
    send = (messages) => {
        for (let i = 0; i < messages.length; i++) {
            const { text, user } = messages[i];

            // create object that can be stored on firebase
            const message = { 
                text,
                user,
                timestamp: this.timestamp
            };
            
            this.append(message);
        }
    }

    // save message with unique ID
    append = (message) => this.ref.push(message);
}

Fire.shared = new Fire();
export default Fire;