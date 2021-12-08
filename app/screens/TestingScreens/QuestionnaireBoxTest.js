import React from 'react';
import { ScrollView, Button, StyleSheet} from 'react-native';
import { Provider } from 'react-redux';

// import store
import store from '../../redux/questionnaire/store.js';
import { QuestionnaireBox } from '../../CustomComponents';

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

// i is the number of questions
const handleSubmit = (list) => {
    let break_flag = false;
    for (let i = 0; i < 10; i++) {
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
        alert("Please fill in all questions");
    } else {
        alert("Score: " + score); // this will be hidden
    }
}

// also need error handling
const QuestionnaireBoxTest = () => {
    return (
        <ScrollView>
            {qnsList}
            
            <Button 
                title="Submit"
                onPress={() => handleSubmit(qnsList)}
            />
        </ScrollView>
    )
}

// do button styling next time :)
const styles=  StyleSheet.create({
    button: {

    }
})

export default QuestionnaireBoxTest