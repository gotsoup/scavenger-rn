import { combineReducers } from 'redux';
import itemReducer from './items/reducer';

const appReducer = combineReducers({
    itemReducer
});

const rootReducer = (state: any, action: any) => {
    return appReducer(state, action);
}

export default rootReducer;