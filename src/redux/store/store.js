import {persistStore, persistReducer} from 'redux-persist';
import {configureStore} from '@reduxjs/toolkit';
import FileSystemStorage from '../../FileSystemStorage';
import {rootReducer} from '../reducers/rootReducer';

const persistConfig = {
  key: 'root',
  storage: FileSystemStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
      immutableCheck: false,
    }),
  ],
});

const persistor = persistStore(store);

export {store, persistor};
