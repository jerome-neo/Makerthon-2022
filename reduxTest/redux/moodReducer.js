// create the action types in the reducer
export const MOOD_CHANGE = 'MOOD_CHANGE';

const initialState = ['ok'];

// mood reducer accepts a state, and an action. payload = an index, to change our mood accordingly to
const moodReducer = (state = initialState, action) => {
    switch (action.type) {
        case MOOD_CHANGE:
            return { ...state, MOOD_CHANGE: action.payload }
        default:
            return state;
    }
}

export default moodReducer;