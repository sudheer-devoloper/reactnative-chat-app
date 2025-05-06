import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistConfig } from 'redux-persist';
import rootReducer, { RootState } from '../reducers';

// Create a properly typed persist config
const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['theme','fcm'], // persist only theme reducer
};

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
