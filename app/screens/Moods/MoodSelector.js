import React from 'react'
import { TouchableOpacity, StyleSheet, Text, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_MOOD } from '../../redux/mood/moodReducer'; // action takes place here, so import


const MoodSelector = ({ navigation }) => {
  const mood = useSelector(state => state);
  const dispatch = useDispatch();
  const changeMoods = (moodIndex) => dispatch({ type: CHANGE_MOOD, payload: moodIndex });
  return (
    <SafeAreaView style={styles.container}>
        <Text>Select Mood</Text>
        { 
            mood.possible.map((moods, index) => (
                <TouchableOpacity key={moods} onPress={() => {changeMoods(index); navigation.goBack();}}>
                    <Text> change to {moods} </Text>
                </TouchableOpacity>
            ))
        }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default MoodSelector;