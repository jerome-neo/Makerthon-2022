// action
export const UPDATE_ANSWER = 'UPDATE_ANSWER';

// answers = ["Text", scoreValue, checked]
// unfortunate but we need 1 for each question unless there is a better way to do it...
const initialState = [
    { 
        currScore: 0,
        answers: [
            ["None of the time", 1, false], 
            ["A little of the time", 2, false], 
            ["Some of the time", 3, false], 
            ["Most of the time", 4, false], 
            ["All of the time", 5, false]
    ]},
    { 
        currScore: 0,
        answers: [
            ["None of the time", 1, false], 
            ["A little of the time", 2, false], 
            ["Some of the time", 3, false], 
            ["Most of the time", 4, false], 
            ["All of the time", 5, false]
    ]},
    { 
        currScore: 0,
        answers: [
            ["None of the time", 1, false], 
            ["A little of the time", 2, false], 
            ["Some of the time", 3, false], 
            ["Most of the time", 4, false], 
            ["All of the time", 5, false]
    ]},
    { 
        currScore: 0,
        answers: [
            ["None of the time", 1, false], 
            ["A little of the time", 2, false], 
            ["Some of the time", 3, false], 
            ["Most of the time", 4, false], 
            ["All of the time", 5, false]
    ]},
    { 
        currScore: 0,
        answers: [
            ["None of the time", 1, false], 
            ["A little of the time", 2, false], 
            ["Some of the time", 3, false], 
            ["Most of the time", 4, false], 
            ["All of the time", 5, false]
    ]},
    { 
        currScore: 0,
        answers: [
            ["None of the time", 1, false], 
            ["A little of the time", 2, false], 
            ["Some of the time", 3, false], 
            ["Most of the time", 4, false], 
            ["All of the time", 5, false]
    ]},
    { 
        currScore: 0,
        answers: [
            ["None of the time", 1, false], 
            ["A little of the time", 2, false], 
            ["Some of the time", 3, false], 
            ["Most of the time", 4, false], 
            ["All of the time", 5, false]
    ]},
    { 
        currScore: 0,
        answers: [
            ["None of the time", 1, false], 
            ["A little of the time", 2, false], 
            ["Some of the time", 3, false], 
            ["Most of the time", 4, false], 
            ["All of the time", 5, false]
    ]},
    { 
        currScore: 0,
        answers: [
            ["None of the time", 1, false], 
            ["A little of the time", 2, false], 
            ["Some of the time", 3, false], 
            ["Most of the time", 4, false], 
            ["All of the time", 5, false]
    ]},
    { 
        currScore: 0,
        answers: [
            ["None of the time", 1, false], 
            ["A little of the time", 2, false], 
            ["Some of the time", 3, false], 
            ["Most of the time", 4, false], 
            ["All of the time", 5, false]
    ]},
]

const questionnaireReducer = (state = initialState, action) => {
    switch (action.type) {
        case (UPDATE_ANSWER):
            state.currScore = state.answers[action.payload.answerIndex][1];
            for (let i = 0; i < 5; i++) {
                if (state.answers[i][1] === state.currScore) {
                    state.answers[i][2] = true;
                } else {
                    state.answers[i][2] = false;
                }
            }
            return {...state, UPDATE_ANSWER: action.payload};
        default:
            console.log("Default triggered.");
            return state;
    }
}

const reducer = (state = initialState, action) => {
    if (action.type === UPDATE_ANSWER) {
        const s = {}
        s[action.payload.num] = questionnaireReducer(state[action.payload.num], action);
        return {...state, ...s};
    } else {
        return state;
    }
}

export default reducer;