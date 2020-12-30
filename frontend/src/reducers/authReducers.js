import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_USER_INFO
} from "../constants/authConstants";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: false,
    userInfo: localStorage.getItem('userInfo')
        ? localStorage.getItem('userInfo')
        : '',
    error: false
}

export const authReducer = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case  LOGIN_SUCCESS:
            // localStorage.setItem('token', payload.access)
            return {
                ...state,
                token: payload.access,
                isAuthenticated: true,
                loading: false,

            }
        case SET_USER_INFO:
            // localStorage.setItem('userInfo', payload)
            return {
                ...state,
                userInfo: payload
            }
        case SIGNUP_SUCCESS:

            return {
                ...state,
                isAuthenticated: false,
                loading: true
            }
        case SIGNUP_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:

            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                userInfo: ''
            }
        default:
            return state
    }
}