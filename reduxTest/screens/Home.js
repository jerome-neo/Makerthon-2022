import React from 'react';
import { Button, FlatList, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import { moods } from '../moodsData';

const Item = ({ mood, date }) => (
    <View style={styles.title}>
        <Text style={styles.title}>feeling: {mood}, date: {date} </Text>
    </View>
);

const Home = ({ navigation }) => {
    const renderItem = ({ item }) => (
        <Item 
            date={item.date}
            mood={item.mood} 
        />
    );

    return (
        <SafeAreaView styles={styles.container}>
            <Text> Home Screen </Text>
            <FlatList 
                data={moods}
                renderItem={renderItem}
                keyExtractor={item => item.date}
            />
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
    title: {
        fontSize: 32,
      },
});
  

export default Home;