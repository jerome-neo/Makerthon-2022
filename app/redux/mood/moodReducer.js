// the actions, remember to "export", then import in the place where action is taking place!
export const ADD_MOOD = "ADD_MOOD";
export const MODIFY_MOOD = "MODIFY_MOOD";
// the state represents the moods that have been selected
let initialState = {data: []}

// reducers take in a state, and an action
const moodReducer = (state = initialState, action) => {
  // what to do with the action given?
  switch (action.type) {
    case ADD_MOOD:
      let payload = action.payload;
      let item = payload.item;
      initialState.data = [
        ...(initialState.data),
        {
          moodIndex: payload.moodIndex + 1,
          col: item.col,
          row: item.row,
          month: item.month,
          key: item.key
        },
      ];
      // return the object to moodReducer
      return initialState;
    // just return itself by default
    case MODIFY_MOOD:
      console.log("Modifying");
      // create new array with initialState. Necessary so that it will cause a re-render
      const tempState = [...(initialState).data];
      // Check if there are any items within the state array that corresponds with the key of the item we are wanting to add
      tempState.forEach(item => {
        if (item.key === action.payload.item.key) {
          item.moodIndex = action.payload.moodIndex+1;
        }
      })
      // Reassign initialState to tempState. Since this is a new object, a re-render is forced.
      initialState = tempState;
      return initialState;
      // then find that item and modify its state
    default:
      return state;
  }
};

export default moodReducer;
