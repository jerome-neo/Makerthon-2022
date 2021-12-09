// IMPORTANT:
// Remember to use from here! Reflect all changes from QuestionnaireBoxTest to here, if any.
import React, { useEffect } from 'react';
import { ScrollView, Button, StyleSheet, BackHandler } from 'react-native';
import { Provider } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

// local imports
import { QuestionnaireBox } from '../../CustomComponents';
import store from '../../redux/questionnaire/store';

// [question, question number]. K10 scale. Note, this is reusable so we can change this to GHQ-12 as well.
const questions = [
    ["Did you feel tired out for no good reason?", 0], 
    ["Did you feel nervous?", 1], 
    ["Did you feel so nervous that nothing could calm you down?", 2], 
    ["Did you feel hopeless?", 3], 
    ["Did you feel restless or fidgety?", 4],
    ["Did you feel so restless that you could not sit still?", 5],
    ["Did you feel depressed?", 6],
    ["Did you feel that everything was an effort?", 7],
    ["Did you feel so sad that nothing could cheer you up?", 8],
    ["Did you feel worthless?", 9],
];

const qnsList = questions.map((qns) => {
    return (
        <Provider store={store}>
            <QuestionnaireBox question={qns[0]} qNum={qns[1]} />
        </Provider>
    );
})

// to access the score of each component:
// x.props.store.getState().currScore

// get total score:
// console.log(qnsList.map(x => x.props.store.getState().currScore).reduce((x,y) => x + y))

// create store in here, and pass it to the next component, which is our QuestionnaireBox
let score = 0;

// we'll need navigation screens here as well :)
const giveResources = () => {
    alert("Pop up resources");
}

const referToPFA = () => {
    alert("Referring to PFA...");
}

const referToCounsel = () => {
    alert("Referring to counselling...");
}

const getConsent = () => {
    alert("Getting consent from user");
    // popup buttons to yes/no
}

const referToPsych = () => {
    alert("Referring to psych...");
}


// because navigation hook is failing. Although code is less clean, no serious repurcussions
let navigator = "";

// i is the number of questions
// handles the submit button
const handleSubmit = (list) => {
    let break_flag = false;
    for (let i = 0; i < questions.length; i++) {
        const current = list.map(x => x.props.store.getState())[0][i].currScore;
        if (current == 0) {
            break_flag = true;
            break;
        }
        score += current;
    }

    if (break_flag) {
        // means we have not checked all boxes
        score = 0;
        break_flag = false;
        alert("Please fill in all questions");
    } else {
        // if score..
        if (score <= 24) {
            giveResources();
            navigator = "Resources";
        } else if (score > 25 && score <= 30) {
            referToPFA();
            navigator = "PFA";
        } else if (score > 30 && score <= 40) {
            referToCounsel();
            navigator = "Counsel";
        } else {
            // score > 40
            getConsent(); // needs them to fill up a form first
            referToPsych();
            navigator = "Psych";
        }
    }
    console.log(score);
    score = 0; // reset!!
}

// no need to reset after submitting because the states are not saved on app restart.
const Questionnaire = ({ navigation }) => {
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, []);

    return (
        <ScrollView>
            {qnsList}
            <Button 
                title="Submit"
                onPress={() => {
                    handleSubmit(qnsList); 
                    switch (navigator) {
                        case "Resources":
                            console.log(navigator);
                            navigation.goBack();
                            break;
                        case "PFA":
                            console.log(navigator);
                            navigation.goBack();
                            break;
                        case "Counsel":
                            console.log(navigator);
                            navigation.goBack();
                            break;
                        case "Psych":
                            console.log(navigator);
                            navigation.goBack();
                            break;
                        default:
                            console.log(navigator);
                            navigation.goBack();
                    }
                }}
            />
        </ScrollView>
    )
}

// do button styling next time :)
const styles=  StyleSheet.create({
    button: {

    }
})

export default Questionnaire;