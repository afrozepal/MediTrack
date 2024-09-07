// import { createStore } from 'redux';
// import userReducer from './reducer';

// const store = createStore(userReducer);

// export default store;

// Redux/store.js
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default to localStorage for web
import userReducer from './reducer';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
