import{REGISTER_SUCCESS,REGISTER_FAIL,USER_LOADED,AUTH_ERROR,TOKEN_LOADED,LOGIN_FAIL,LOGIN_SUCCESS, LOGOUT, ACCOUNT_DELETED} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

export default function(state = initialState, action)
{
    const{ type,payload} = action;
    switch(type) {
        case TOKEN_LOADED:
            return {
              ...state,
              token: payload
             }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:   
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:    
        case AUTH_ERROR:   
        case LOGOUT: 
        case ACCOUNT_DELETED:
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state;        
    }
}