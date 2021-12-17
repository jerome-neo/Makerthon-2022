import { createStore } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import moodReducer from "./moodReducer"; // we create a store from this
import hardSet from "redux-persist/lib/stateReconciler/hardSet";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  stateReconciler: hardSet,
};

const persistedReducer = persistReducer(persistConfig, moodReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
// const store = createStore(moodReducer);

// export default store;
