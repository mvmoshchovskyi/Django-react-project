import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
} from "../constants/authConstants";

const initialState = {
    // token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: false,
    error: false,
    userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : '',

}

export const authReducer = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case  LOGIN_SUCCESS:

            return {
                ...state,
                token: payload.access,
                isAuthenticated: true,
                loading: false,
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