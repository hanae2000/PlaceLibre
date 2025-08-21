import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import parkingReducer from './reducers/parkingReducer';

const rootReducer = combineReducers({
    parking: parkingReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;