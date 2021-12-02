import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const AddMoods = () => {
    return (
        <View styles={styles.container}>
            <Text> Add moods here </Text>
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
  

export default AddMoods;