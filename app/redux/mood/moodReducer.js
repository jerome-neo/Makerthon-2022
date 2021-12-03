// the actions, remember to "export", then import in the place where action is taking place!
export const CHANGE_MOOD = 'CHANGE_MOOD';

/**
 * Eventually change to hexcodes
 * Colour : Represents
 * Yellow : Happy 
 * Blue : Sad
 * Grey : Stressed
 * Red : Irritated
 * Green : Calm
 */

const initialState = {
    current: 'white',
    possible: ['yellow', 'blue', 'grey', 'red', 'green'],
    text: '',
}

// reducers take in a state, and an action
const moodReducer = (state = initialState, action) => {
    // what to do with the action given?
    switch (action.type) {
        case CHANGE_MOOD:
            // action.payload is an index
            state.current = state.possible[action.payload];
            // change the text
            switch(state.current) {
                case 'yellow':
                    state.text = 'happy';
                    break;
                case 'blue':
                    state.text = 'sad';
                    break;
                case 'grey':
                    state.text = 'stressed';
                    break;
                case 'red':
                    state.text = 'irritated';
                    break;
                case 'green':
                    state.text = 'calm';
                    break;
                default:
                    state.text = '';
                    break;   
            }
            // return the object to moodReducer
            return {...state, CHANGE_MOOD: action.payload};
        // just return itself by default
        default:
            return state;
    }
}

export default moodReducer;