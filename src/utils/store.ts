import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import rootReducer from '../reducers/rootReducer';

const loggerMiddleware = createLogger();
const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
    const store = createStore(
        persistedReducer,
        applyMiddleware(
            loggerMiddleware,
            thunkMiddleware
        )
    )
    const persistor = persistStore(store);
    return { store, persistor};
}

export default configureStore;

