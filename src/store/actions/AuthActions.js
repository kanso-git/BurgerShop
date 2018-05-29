import axios from '../../axios-orders';
import * as types from './Types';

// actions generators

const initiateLoginAction = () => ({
  type: types.INITIATE_LOGIN
});

const errorLogingAction = () => ({
  type: types.ERROR_LOGIN
});

const loginAction = payload => ({
  type: types.LOGIN,
  payload
});

const logoutAction = payload => ({
  type: types.LOGOUT,
  payload
});

const errorLogoutAction = payload => ({
  type: types.ERROR_LOGOUT,
  payload
});

// axios
const loginAxios = async () => {
  return axios.get('/orders.json');
};

const logoutAxios = async orderData => {
  return axios.post('/orders.json', orderData);
};

// actions
const initiateLogin = () => dispatch => dispatch(initiateLoginAction());

const login = payload => async (dispatch, getState) => {
  try {
    let user = null;
    setTimeout(() => {
      user = { username: 'aka' };
      //const loginAxios = await loginAxios();
      dispatch(loginAction(user));
    }, 2000);
  } catch (e) {
    dispatch(errorLogingAction('login error'));
  }
};

const logout = payload => async (dispatch, getState) => {
  try {
    setTimeout(() => {
      const user = {};
      //const loginAxios = await loginAxios();
      dispatch(logoutAction(user));
    }, 2000);
  } catch (e) {
    dispatch(errorLogoutAction('error placing order'));
  }
};

export { initiateLogin, login, logout };
