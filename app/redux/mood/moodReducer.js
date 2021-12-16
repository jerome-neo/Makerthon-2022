// the actions, remember to "export", then import in the place where action is taking place!
export const ADD_MOOD = "ADD_MOOD";

// the state represents the moods that have been selected
let initialState = [];

// reducers take in a state, and an action
const moodReducer = (state = initialState, action) => {
  // what to do with the action given?
  switch (action.type) {
    case ADD_MOOD:
      let payload = action.payload;
      let item = payload.item;
      initialState = [
        ...initialState,
        {
          moodIndex: payload.moodIndex + 1,
          col: item.col,
          row: item.row,
          month: item.month,
        },
      ];
      // return the object to moodReducer
      return initialState;
    // just return itself by default
    default:
      return state;
  }
};

export default moodReducer;
