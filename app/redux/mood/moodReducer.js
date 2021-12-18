import { REHYDRATE } from "redux-persist/es/constants";
import * as dateFn from "date-fns";

// the actions, remember to "export", then import in the place where action is taking place!
export const ADD_MOOD = "ADD_MOOD";
export const MODIFY_MOOD = "MODIFY_MOOD";
// the state represents the moods that have been selected
let initialState = {
  data: [],
  logPoints: 0,
};

const currentDate = new Date();

// reducers take in a state, and an action
const moodReducer = (state = initialState, action) => {
  // what to do with the action given?
  switch (action.type) {
    case ADD_MOOD:
      let payload = action.payload;
      let item = payload.item;
      const itemDay = item.day;
      const itemMonth = item.month;
      const currDay = dateFn.getDate(currentDate);
      const currMonth = dateFn.getMonth(currentDate);
      initialState.data = [
        ...initialState.data,
        {
          moodIndex: payload.moodIndex + 1,
          col: item.col,
          row: item.row,
          day: itemDay,
          month: itemMonth,
          year: item.year, // most likely not needed
          key: item.key,
        },
      ];

      if (itemDay === currDay && itemMonth === currMonth) {
        initialState.logPoints++; // if you log on that day itself, you get 1 point
      }

      // return the object to moodReducer
      return { ...initialState, ADD_MOOD: action.payload };
    // just return itself by default
    case MODIFY_MOOD:
      console.log("Modifying");
      // create new array with initialState. Necessary so that it will cause a re-render
      const tempState = [...initialState.data];
      // Check if there are any items within the state array that corresponds with the key of the item we are wanting to add
      tempState.forEach((item) => {
        if (item.key === action.payload.item.key) {
          item.moodIndex = action.payload.moodIndex + 1;
        }
      });
      // Reassign initialState to tempState. Since this is a new object, a re-render is forced.
      initialState.data = tempState;
      return { ...initialState, MODIFY_MOOD: action.payload };
    // then find that item and modify its state
    case REHYDRATE:
      // some error handling, for initial startup where there's no payload
      if (action.payload === undefined) {
        return state;
      }
      // merging the data
      const tempStateData = state.data.concat(action.payload.data);
      // in case data is blank
      if (tempStateData !== null) {
        initialState.data = tempStateData;
      }
      initialState.logPoints = action.payload.logPoints; // getting back the rehydrated logPoints
      // return the merged state
      return { ...initialState, REHYDRATE: action.payload };
    default:
      return state;
  }
};

export default moodReducer;
