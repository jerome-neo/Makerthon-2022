// IMPORTANT:
// Remember to use from here! Reflect all changes from QuestionnaireBoxTest to here, if any.
import React, { useEffect } from "react";
import {
  ScrollView,
  Button,
  StyleSheet,
  BackHandler,
  Alert,
} from "react-native";
import { Provider } from "react-redux";

// local imports
import { QuestionnaireBox } from "../../CustomComponents";
import store from "../../redux/questionnaire/store";

// [question, question number]. K10 scale. Note, this is reusable so we can change this to GHQ-12 as well.
const questions = [
  ["Did you feel tired out for no good reason?", 0],
  ["Did you feel nervous?", 1],
  ["Did you feel so nervous that nothing could calm you down?", 2],
  ["Did you feel hopeless?", 3],
  ["Did you feel restless or fidgety?", 4],
  ["Did you feel so restless that you could not sit still?", 5],
  ["Did you feel depressed?", 6],
  ["Did you feel that everything was an effort?", 7],
  ["Did you feel so sad that nothing could cheer you up?", 8],
  ["Did you feel worthless?", 9],
];

const qnsList = questions.map((qns) => {
  return (
    <Provider store={store}>
      <QuestionnaireBox question={qns[0]} qNum={qns[1]} key={qns[1]} />
    </Provider>
  );
});

// to access the score of each component:
// x.props.store.getState().currScore

// get total score:
// console.log(qnsList.map(x => x.props.store.getState().currScore).reduce((x,y) => x + y))

// create store in here, and pass it to the next component, which is our QuestionnaireBox
let score = 0;

// toNav is a function. Pass it in the form of "() => navigation.navigate(...)". Must be lazy, otherwise it'll do the navigation onPress.
const customAlert = (title, msg, accept, decline) => {
  Alert.alert(title, msg, [
    {
      text: "Decline",
      onPress: decline,
      style: "cancel",
    },
    {
      text: "Accept",
      onPress: accept,
      style: "default",
    },
  ]);
};

// we'll need navigation screens here as well :)
// confirm is a function. Specifically, it's the navigation function
const giveResources = (confirm) => {
  Alert.alert(
    "Results",
    "Based on the survey, you're just having a bad time these few days. Here's some resources to help you!"
  );
  confirm();
};

const referToPFA = (action) => {
  alert("Referring to PFA...");
  action();
};

const getConsent = (accept, decline) => {
  customAlert(
    "Consent",
    "By consenting, you agree to allow us to use your details for making an appointment with University Counselling Services",
    accept,
    decline
  );
};

// not sure if this is necessary now.
const referToCounsel = (action) => {
  alert("Referring to counselling...");

  action();
};

const referToPsych = (accept, decline) => {
  getConsent(accept, decline);
};

const declineHandler = (submit) => {
  Alert.alert(
    "Declined", // title
    "We still strongly recommend you to seek help. Meanwhile, here's a list of resources you can use", // message
    submit // on accept
  );
};
// because navigation hook is failing. Although code is less clean, no serious repurcussions
let navigator = "";

// i is the number of questions
// handles the submit button. Handle navigation/alerts later
const handleSubmit = (list) => {
  let break_flag = false;
  for (let i = 0; i < questions.length; i++) {
    const current = list.map((x) => x.props.store.getState())[0][i].currScore;
    if (current == 0) {
      break_flag = true;
      break;
    }
    score += current;
  }

  if (break_flag) {
    // means we have not checked all boxes
    score = 0;
    break_flag = false;
    alert("Please fill in all questions");
  } else {
    // if score..
    if (score <= 24) {
      navigator = "Resources";
    } else if (score >= 25 && score <= 30) {
      navigator = "PFA";
    } else if (score > 30 && score <= 40) {
      navigator = "Counsel";
    } else {
      // score > 40
      navigator = "Psych";
    }
  }
  console.log(score);
  score = 0; // reset!!
};

// no need to reset after submitting because the states are not saved on app restart.
const Questionnaire = ({ navigation }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

  const three_alert = (title, msg, choice) => {
    Alert.alert(title, msg, [
      {
        text: "I do not want help",
        onPress: () => declineHandler(navigation.navigate("Resources")),
        style: "cancel",
      },
      {
        text: "Talk to a counsellor",
        onPress: () =>
          choice === "PFA"
            ? referToPFA(() => navigation.goBack()) // takes an action
            : referToCounsel(() => navigation.goBack()), // takes an action
        style: "default",
      },
      {
        text: "Clinical",
        onPress: () =>
          referToPsych(
            () => navigation.navigate("FormDetails"),
            () => declineHandler(navigation.navigate("Resources"))
          ), // done.
        style: "default",
      },
    ]);
  };

  // the message to be shown to the user
  const msg = (recommended) => {
    if (recommended === "PFA") {
      three_alert(
        "Results",
        "Based on your results, we recommend talking anonymously to a Counsellor, but you can choose either.",
        "PFA"
      );
    } else if (recommended === "Counsel") {
      three_alert(
        "Results",
        "Based on your results, we recommend talking anonymously to a Counsellor, but you can choose either.",
        "Counsel"
      );
    } else {
      three_alert(
        "Results",
        "Based on your results, we recommend booking an appointment with UCS, but you can choose either.",
        "Counsel"
      );
    }
  };

  return (
    <ScrollView>
      {qnsList}
      <Button
        title="Submit"
        onPress={() => {
          handleSubmit(qnsList);
          switch (navigator) {
            case "Resources":
              console.log(navigator);
              giveResources(() => navigation.navigate("Resources"));
              break;
            case "PFA":
              console.log(navigator);
              msg("PFA");
              break;
            case "Counsel":
              console.log(navigator);
              msg("Counsel");
              break;
            case "Psych":
              console.log(navigator);
              msg("Psych");
              break;
            default:
              break;
          }
        }}
      />
    </ScrollView>
  );
};

// do button styling next time :)
const styles = StyleSheet.create({
  button: {},
});

export default Questionnaire;
