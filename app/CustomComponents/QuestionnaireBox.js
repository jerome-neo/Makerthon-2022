import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

import { UPDATE_ANSWER } from '../redux/questionnaire/questionnaireReducer';

// we can turn this into a reusable component and pass down a variable called questionName in order to specify a question

const QuestionnaireBox = (props) => {
    const num = props.qNum;
    console.log(props.id);
    const answers = useSelector(state => state[num]);
    const dispatch = useDispatch();
    const updateAnswer = (answerIndex) => dispatch({ type: UPDATE_ANSWER, payload: { answerIndex, num }});
    return (
        <SafeAreaView>
            <Text style={{fontSize: 15, fontWeight: 'bold', marginBottom: 10, marginTop: 20}}> {num+1}) {props.question} </Text>
            <SafeAreaView style={{justifyContent: 'center', alignItems: 'center'}}>
            {
              answers.answers.map((answer, index) => (
              <CheckBox
                center
                key={num}
                title={answer[0]}
                checkedIcon=""
                uncheckedIcon=""
                checked={answer[2]}
                containerStyle={answer[2] === true ? styles.containerChosen : styles.containerNotChosen }
                onPress={() => { updateAnswer(index) }}     
            />
        ))}
      </SafeAreaView>
    </SafeAreaView>
  );
}

// UX improvements:
// Implement a Quick jump to Question. We'll need to use React's Route for this
// Need a persistent bottom tab to go to questions.


const styles = StyleSheet.create({
  containerChosen: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgreen',
    marginBottom: 10,
    width: '90%'
  },
  containerNotChosen: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginBottom: 10,
    width: '90%'
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#febe29',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold'
  }
});

export default QuestionnaireBox;