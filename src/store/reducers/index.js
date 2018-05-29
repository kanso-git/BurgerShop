import { combineReducers } from 'redux';
import burgerReducer from './BurgerReducer';
import orderReducer from './OrderReducer';
import authReducer from './AuthReducer';

export default combineReducers({
  burger: burgerReducer,
  order: orderReducer,
  auth: authReducer
});
