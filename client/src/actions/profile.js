import axios from "axios";
import { setAlert } from "./alert";

import {
    ACCOUNT_DELETED,
    CLEAR_PROFILE,
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    GET_REPOS
} from './types';

//get current users profile
export const getCurrentProfile = () => async dispatch =>{
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

//Get all profiles

export const getProfiles = () => async dispatch =>{
    dispatch({ type: CLEAR_PROFILE});
    try {
        const res = await axios.get('/api/profile');

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

//Get all profile by id

export const getProfileById = userID => async dispatch =>{
    try {
        const res = await axios.get(`/api/profile/user/${userID}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

//Get Github repos

export const getGithubRepos = username => async dispatch =>{
    try {
        const res = await axios.get(`/api/profile/github/${username}`);

        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

//create or update profile
export const createProfile = (FormData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {'Content-Type' : 'application/json'}
        }

        const res = await axios.post('/api/profile', FormData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

        if(!edit)
        {
            history.push('/dashboard');
        }
    } catch (err) {
      const errors = err.response.data.errors;

       if (errors) 
       {
          errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
       }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

//Add experience
export const addExperience = (FormData, history) => async dispatch => {

    try {
        const config = {
            headers: {'Content-Type' : 'application/json'}
        }

        const res = await axios.put('/api/profile/experience', FormData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Added', 'success'));

        history.push('/dashboard');

    } catch (err) {
      const errors = err.response.data.errors;

       if (errors) 
       {
          errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
       }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

//Add Education
export const addEducation = (FormData, history) => async dispatch => {

    try {
        const config = {
            headers: {'Content-Type' : 'application/json'}
        }

        const res = await axios.put('/api/profile/education', FormData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Added', 'success'));

        history.push('/dashboard');

    } catch (err) {
      const errors = err.response.data.errors;

       if (errors) 
       {
          errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
       }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

//Delete Experience
export const deleteExperience = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Removed', 'success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

//Delete Education
export const deleteEducation = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Removed', 'success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

//Delete account & profile
export const deleteAccount = id => async dispatch => {
    if(window.confirm("Are you sure? This can Not be undone!")){

    
    try {
        await axios.delete('/api/profile');

        dispatch({type: CLEAR_PROFILE});
        dispatch({type: ACCOUNT_DELETED});

        dispatch(setAlert('Your account has been permanantly deleted'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}
};
