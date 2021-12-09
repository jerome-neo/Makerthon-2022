import { createStore } from 'redux';
import reducer from './questionnaireReducer'; // we create a store from this

// generate objects based on # of questions
const store = createStore(reducer);

export default store;