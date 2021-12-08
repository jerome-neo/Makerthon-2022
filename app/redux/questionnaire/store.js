import { createStore } from 'redux';
import questionnaireReducer from './questionnaireReducer'; // we create a store from this

const store = createStore(questionnaireReducer);

export default store;