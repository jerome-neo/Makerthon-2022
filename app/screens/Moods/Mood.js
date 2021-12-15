import React from 'react';
import { TouchableOpacity, StyleSheet, Text, SafeAreaView, View } from 'react-native';
import { useSelector } from 'react-redux';
import { MoodCalendar } from '../../CustomComponents';

const Mood = ({ navigation }) => {
  const state = useSelector(state => state);

  return (
    <SafeAreaView>
      <MoodCalendar/>
      <SafeAreaView style={{marginTop: 50, alignItems: 'center', justifyContent: 'center'}}>
        <Text> Feeling {state.text} </Text>
        <TouchableOpacity onPress={() => navigation.navigate('MoodSelector')}>
          <Text> Select feeling </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('QuestionnaireStack')}>
          <Text style={{fontSize: 24}}> Go to questionnaire </Text>
        </TouchableOpacity>
      </SafeAreaView>
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


export default Mood;