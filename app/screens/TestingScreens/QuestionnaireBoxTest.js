import React from 'react';
import { ScrollView, Button, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

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
            <QuestionnaireBox question={qns[0]} key={qns[1]} qNum={qns[1]} />
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
    alert("Popup resources");
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


// because navigation hook is failing..
let navigator = "";
// should popup a prompt and and tell them what their score means
// then navigate them to the correct page
// need to get consent for everything besides resources
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
            getConsent();
            referToPsych();
            navigator = "Psych";
        }
    }
    console.log(score);
    score = 0; // reset!!
}

// also need error handling
const QuestionnaireBoxTest = ({navigation}) => {
    return (
        <ScrollView>
            {qnsList}
            <Button 
                title="Submit"
                onPress={() => {
                    console.log(qnsList);
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
                            break;
                    }
                }}
            />
            <Button title="AddditionalButton" onPress={() => console.log(qnsList)}/>
        </ScrollView>
    )
}

// do button styling next time :)
const styles=  StyleSheet.create({
    button: {

    }
})

export default QuestionnaireBoxTest