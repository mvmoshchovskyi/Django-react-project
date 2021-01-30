import {
    ADDRESS_CREATE_REQUEST,
    ADDRESS_CREATE_SUCCESS,
    ADDRESS_CREATE_FAIL
} from "../constants/addressConstants";
import Axios from "axios";


export const saveShippingAddress = (shippingAddress) => async (dispatch, getState) => {

    dispatch({type: ADDRESS_CREATE_REQUEST, payload: shippingAddress});
    try {
        const token = getState().auth.userInfo.access
        const config = {
            headers: {
                authorization: `Bearer ${token}`,
            }
        }
        const {data} = await Axios.post(`${process.env.REACT_APP_API_URL}/api/address/create/`, shippingAddress, config
        );
        // localStorage.setItem('cartItems', JSON.stringify(getState().address.shippingAddress));
        localStorage.setItem('shippingAddress', JSON.stringify(data))
        dispatch({type: ADDRESS_CREATE_SUCCESS, payload: data});

    } catch (error) {
        dispatch({
            type: ADDRESS_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}