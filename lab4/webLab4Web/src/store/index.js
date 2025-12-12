import {createStore, combineReducers, applyMiddleware} from 'redux';
import authReducer from './ducks/authDuck';
import pointReducer from "./ducks/pointDuck";
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
    auth: authReducer,
    point: pointReducer,
});

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
