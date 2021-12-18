import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ADD_MOOD, MODIFY_MOOD } from "../../redux/mood/moodReducer"; // action takes place here, so import

const icons = require("../../icons/icons.js");
const possible = [
  "mood_happy",
  "mood_okay",
  "mood_calm",
  "mood_sad",
  "mood_stress",
  "mood_angry",
  "mood_anxious",
];

const possible_sunglasses = [
  "mood_sad_sunglasses",
  "mood_stress_sunglasses",
  "mood_okay_sunglasses",
  "mood_happy_sunglasses",
  "mood_calm_sunglasses",
  "mood_anxious_sunglasses",
  "mood_angry_sunglasses",
];

const MoodSelector = ({ navigation, route }) => {
  const { item } = route.params;
  const addedMoods = useSelector((state) => state.data); // get the array of added moods, aka our state array
  const dispatch = useDispatch();
  // dispatching the action, which is to add a mood to our state array
  // we pass down the entire item so we ensure that we'll always have all properties of the object
  const addMoods = (moodIndex) =>
    dispatch({
      type: ADD_MOOD,
      payload: { moodIndex: moodIndex, item: item },
    });
  const modifyMoods = (moodIndex) => {
    dispatch({
      type: MODIFY_MOOD,
      payload: { moodIndex: moodIndex, item: item },
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text>Select Mood</Text>
      <SafeAreaView style={styles.moodSplit}>
        <SafeAreaView style={styles.moodStyle}>
          {possible.map((moods, index) => {
            if (index < 4) {
              return (
                <SafeAreaView style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    key={moods}
                    onPress={() => {
                      // console.log(addedMoods)
                      addedMoods.some((x) => x.key === item.key)
                        ? modifyMoods(index)
                        : addMoods(index);
                      navigation.goBack();
                    }}
                  >
                    <Image style={styles.imageStyle} source={icons[moods]} />
                  </TouchableOpacity>
                </SafeAreaView>
              );
            }
          })}
        </SafeAreaView>
        <SafeAreaView style={styles.moodStyle}>
          {possible.map((moods, index) => {
            if (index >= 4) {
              return (
                <TouchableOpacity
                  key={moods}
                  onPress={() => {
                    addedMoods.some((x) => x.key === item.key)
                      ? modifyMoods(index)
                      : addMoods(index);
                    navigation.goBack();
                  }}
                >
                  <Image style={styles.imageStyle} source={icons[moods]} />
                </TouchableOpacity>
              );
            }
          })}
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
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
