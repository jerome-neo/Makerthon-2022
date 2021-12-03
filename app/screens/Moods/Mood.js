import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';


const Mood = ({ navigation }) => {
  const state = useSelector(state => state);

  return (
    <View style={styles.container}>
      <Text>Mood screen</Text>
      <Text style={{fontSize: 20, backgroundColor: state.current}}> Box Placeholder </Text>
      <Text> Feeling {state.text} </Text>
      <TouchableOpacity onPress={() => navigation.navigate('MoodSelector')}>
        <Text> Select feeling </Text>
      </TouchableOpacity>
    </View>
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