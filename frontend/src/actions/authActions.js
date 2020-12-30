import axios from 'axios';
import {setAlert} from "./alertActions";
import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_USER_INFO,

} from '../constants/authConstants'


export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const body = JSON.stringify({email, password})
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/token/`, body, config)
        localStorage.setItem('token', res.data.access)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        localStorage.setItem('userInfo', email)
        dispatch({
            type: SET_USER_INFO,
            payload: email
        })
        dispatch(setAlert('Authenticated successfully', 'success'))
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
        })
        dispatch(setAlert('Error Authenticated', 'danger'))
    }
}
export const signUp = ({name, email, password, password2}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({name, email, password, password2});

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/accounts/signup`, body, config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });

        dispatch(login(email, password));
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        });
        dispatch(setAlert('Error Authenticating', 'danger'));
    }
};

export const logout = () => dispatch => {
    dispatch(setAlert('logout successful', 'success'))
    dispatch({type: LOGOUT})
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('token')

}