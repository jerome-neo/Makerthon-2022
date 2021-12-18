import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  Button,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ADD_MOOD, MODIFY_MOOD } from "../../redux/mood/moodReducer"; // action takes place here, so import

const icons = require("../../icons/icons.js");
const possible = [
  { id: "0", title: "happy", src: "mood_happy" },
  { id: "1", title: "okay", src: "mood_okay" },
  { id: "2", title: "calm", src: "mood_calm" },
  { id: "3", title: "sad", src: "mood_sad" },
  { id: "4", title: "stressed", src: "mood_stressed" },
  { id: "5", title: "angry", src: "mood_angry" },
  { id: "6", title: "anxious", src: "mood_anxious" },
];

const possible_sunglasses = [
  { id: "0_sunglasses", title: "happy", src: "mood_happy_sunglasses" },
  { id: "1_sunglasses", title: "okay", src: "mood_okay_sunglasses" },
  { id: "2_sunglasses", title: "calm", src: "mood_calm_sunglasses" },
  { id: "3_sunglasses", title: "sad", src: "mood_sad_sunglasses" },
  { id: "4_sunglasses", title: "stressed", src: "mood_stressed_sunglasses" },
  { id: "5_sunglasses", title: "angry", src: "mood_angry_sunglasses" },
  { id: "6_sunglasses", title: "anxious", src: "mood_anxious_sunglasses" },
];

const MoodSelector = ({ navigation, route }) => {
  const { item } = route.params;
  const addedMoods = useSelector((state) => state.data); // get the array of added moods, aka our state array
  // just store the accessible, additional icons as an array, and just read from the array if we want to check if user has access to it
  const [accessible, setAccessible] = useState([]);
  const dispatch = useDispatch();
  // Actions. Item to be passed down to Reducer. actualMood is "src".
  const addMoods = (mood) =>
    dispatch({
      type: ADD_MOOD,
      payload: { mood: mood, item: item },
    });
  const modifyMoods = (mood) => {
    dispatch({
      type: MODIFY_MOOD,
      payload: { mood: mood, item: item },
    });
  };

  console.log(item);
  // Flatlist stuff
  const Item = ({ imageSrc, moodName, moodSrc }) => {
    const _onPress = () => {
      // if the key already exists, it means we are modifying a mood instead of adding
      console.log(moodSrc);
      addedMoods.some((x) => x.key === item.key)
        ? modifyMoods(moodSrc)
        : addMoods(moodSrc);
      navigation.goBack();
    };

    return (
      <TouchableOpacity
        style={{
          marginTop: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => _onPress()}
      >
        <Image style={styles.imageStyle} source={imageSrc} />
        <Text>{moodName}</Text>
      </TouchableOpacity>
    );
  };

  const LockedItem = ({ imageSrc, moodName }) => {
    const _onPress = () => {
      Alert.alert("Sorry!", "You do not have access to these yet");
    };

    return (
      <TouchableOpacity
        style={{
          marginTop: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => _onPress()}
      >
        <Image style={styles.imageStyle} source={imageSrc} />
        <Text>{moodName}</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <Item
        imageSrc={icons[item.src]}
        moodName={item.title}
        moodSrc={item.src}
      />
    );
  };

  const renderLockedItem = ({ item }) => {
    return (
      <LockedItem
        imageSrc={icons[item.src]}
        moodName={item.title}
        moodSrc={item.src}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Select moods</Text>
      <FlatList
        ListHeaderComponent={<Text>Normal Series</Text>}
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        data={possible}
        numColumns={4}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <FlatList
        ListHeaderComponent={<Text>Sunglasses Series</Text>}
        contentContainerStyle={{
          flex: 1,
          // justifyContent: "center",
          alignItems: "center",
        }}
        data={possible_sunglasses}
        numColumns={4}
        renderItem={
          accessible.some((x) => "sunglasses") ? renderItem : renderLockedItem // if user has access, then render the unlocked item. else, render a locked one.
        }
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },

  moodStyle: {
    flexDirection: "row",
    margin: 10,
  },

  moodSplit: {
    justifyContent: "center",
    alignItems: "center",
  },

  imageStyle: {
    // Height to width ratio is 1.25 : 1
    height: 62.5,
    width: 50,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default MoodSelector;
