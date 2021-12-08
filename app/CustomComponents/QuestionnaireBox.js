import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView, Image, View} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

import { UPDATE_ANSWER } from '../redux/questionnaire/questionnaireReducer';

// we can turn this into a reusable component and pass down a variable called questionName in order to specify a question

const QuestionnaireBox = (props) => {
    const num = props.qNum;
    const answers = useSelector(state => state[num]);
    const dispatch = useDispatch();
    const updateAnswer = (answerIndex) => dispatch({ type: UPDATE_ANSWER, payload: { answerIndex, num }});
    return (
        <View>
            <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 20}}> Question: {props.question} </Text>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
            {
              answers.answers.map((answer, index) => (
              <CheckBox
                center
                key={answer[0]}
                title={answer[0]}
                checkedIcon=""
                uncheckedIcon=""
                checked={answer[2]}
                containerStyle={answer[2] === true ? styles.containerChosen : styles.containerNotChosen }
                onPress={() => { updateAnswer(index);}}    
            />
        ))}
      </View>
    </View>
  );
}

// Implement a Quick jump to Question. We'll need to use React's Route for this
// Need a persistent bottom tab to go to questions.
/*const QuestionList = ["Hello", "How", "Are", "You", "?"];
const QuestionnaireBoxList = QuestionList.map((questions) => {
  return (
    <QuestionnaireBoxThing question={questions}/>
  )
})

// provide questions as an array of questions
const QuestionnaireBox = (questions) => {
  return (
    <ScrollView>
      {QuestionnaireBoxList}
    </ScrollView>
  );
}
*/
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