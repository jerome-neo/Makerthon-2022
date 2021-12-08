import React from 'react';
import { ScrollView, Button, View, Text} from 'react-native';
import { Provider } from 'react-redux';

// import store
import store from '../../redux/questionnaire/store.js';
import { QuestionnaireBox } from '../../CustomComponents';

// [question, question number]
const questions = [["How", 0], ["Are", 1], ["You", 2], ["Feeling", 3], ["Today?", 4]];

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

const QuestionnaireBoxTest = () => {
    return (
        <ScrollView>
            {qnsList}
            <Button title="Submit" onPress={() => {
                for (let i = 0; i < 10; i++) {
                    score += (qnsList.map(x => x.props.store.getState())[0][i].currScore)
                }

                console.log(score);
            }
            }/>
        </ScrollView>
    )
}

export default QuestionnaireBoxTest