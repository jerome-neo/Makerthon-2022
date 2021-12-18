import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  FlatList,
} from "react-native";

const icons = require("../../icons/icons.js");
const possible = [
  { id: "0", title: "happy", src: "mood_happy_sunglasses" },
  { id: "1", title: "okay", src: "mood_okay_sunglasses" },
  { id: "2", title: "calm", src: "mood_calm_sunglasses" },
  { id: "3", title: "sad", src: "mood_sad_sunglasses" },
  { id: "4", title: "stressed", src: "mood_stressed_sunglasses" },
  { id: "5", title: "angry", src: "mood_angry_sunglasses" },
  { id: "6", title: "anxious", src: "mood_anxious_sunglasses" },
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

const FlatListMoods = ({ navigation, route }) => {
  const Item = ({ image, mood }) => {
    return (
      <TouchableOpacity
        style={{
          marginTop: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => console.log("Handler activated")}
      >
        <Image style={styles.imageStyle} source={image} />
        <Text>{mood}</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => {
    return <Item image={icons[item.src]} mood={item.title} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Select moods</Text>
      <FlatList
        ListHeaderComponent={<Text>Sunglasses Series</Text>}
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        data={possible_sunglasses}
        numColumns={4}
        renderItem={renderItem}
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

export default FlatListMoods;
