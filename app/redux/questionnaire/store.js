import { createStore } from 'redux';
import reducer from './questionnaireReducer'; // we create a store from this

const store = createStore(reducer);

export default store;