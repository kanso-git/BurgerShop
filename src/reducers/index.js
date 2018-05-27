import {combineReducers} from 'redux';
import burgerReducer from './BurgerReducer';
import orderReducer from './OrderReducer';

export default combineReducers({
    burger: burgerReducer,
    order: orderReducer
});
