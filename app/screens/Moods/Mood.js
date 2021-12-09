import React from 'react';
import { TouchableOpacity, StyleSheet, Text, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';


const Mood = ({ navigation }) => {
  const state = useSelector(state => state);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize: 20, backgroundColor: state.current}}> Box Placeholder </Text>
      <Text> Feeling {state.text} </Text>
      <TouchableOpacity onPress={() => navigation.navigate('MoodSelector')}>
        <Text> Select feeling </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('QuestionnaireStack')}>
        <Text style={{fontSize: 24}}> Go to questionnaire </Text>
      </TouchableOpacity>
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