import { createStore } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'
import moodReducer from './moodReducer'; // we create a store from this

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, moodReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
// const store = createStore(moodReducer);

// export default store;