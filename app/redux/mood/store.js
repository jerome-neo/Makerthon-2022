import { createStore } from 'redux';
import moodReducer from './moodReducer'; // we create a store from this

const store = createStore(moodReducer);

export default store;