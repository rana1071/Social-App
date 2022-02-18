import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  TOKEN_LOADED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_PROFILE
} from './types';
import makeAuthTokenHeader from '../utils/makeAuthTokenHeader';
 
 
export const loadToken = () => async dispatch => {
  if (sessionStorage.token) {
    return dispatch({
      type: TOKEN_LOADED,
      payload: sessionStorage.getItem('token')
    })
  } else {
    dispatch({
      type: AUTH_ERROR
    })
  }
}
 
// Load user
export const loadUser = () => async (dispatch, getStore) => {
 
  try {
    const header = makeAuthTokenHeader(getStore().auth.token);
    const res = await axios.get('/api/auth', header);
 
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
}
 
// Register user
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
 
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post('/api/users', body, config);
    sessionStorage.setItem('token', res.data.token);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })
    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    sessionStorage.removeItem('token');
    dispatch({
      type: REGISTER_FAIL
    });
  }
}

// Login user
export const login = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
 
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/api/auth', body, config);
    sessionStorage.setItem('token', res.data.token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })
    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    sessionStorage.removeItem('token');
    dispatch({
      type: LOGIN_FAIL
    });
  }
}

//logout /clear profile

export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE});
  dispatch({ type: LOGOUT});
};
