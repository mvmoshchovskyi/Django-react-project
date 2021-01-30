import axios from 'axios';
import {setAlert} from "./alertActions";
import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,

} from '../constants/authConstants'


export const login = (email, password) => async( dispatch,getState) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const body = JSON.stringify({email, password})
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/token/`, body, config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        localStorage.setItem('userInfo', JSON.stringify(getState().auth.userInfo));
           // localStorage.setItem('userInfo', JSON.stringify(res.data))

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
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/accounts/register`, body, config);
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
    localStorage.removeItem('shippingAddress')

}