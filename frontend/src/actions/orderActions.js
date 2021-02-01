import Axios from "axios";
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,

    ORDER_DELETE_REQUEST,
    ORDER_DELETE_SUCCESS,
    ORDER_DELETE_FAIL,

} from "../constants/orderConstnts";
import {CART_EMPTY} from "../constants/cartConstants";
import {setAlert} from "./alertActions";

export const createOrder = (order) => async (dispatch, getState) => {

    dispatch({type: ORDER_CREATE_REQUEST});
    try {
        const token = getState().auth.userInfo.access

        const config = {
            headers: {
                authorization: `Bearer ${token}`,
            }
        }
        const {data} = await Axios.post(`${process.env.REACT_APP_API_URL}/api/orders/create/`, order, config
        );

        dispatch({type: ORDER_CREATE_SUCCESS, payload: data});
        dispatch({type: CART_EMPTY});
        // localStorage.setItem('orderDetail', JSON.stringify(getState().order.orderDetail));
        localStorage.removeItem('cartItems');
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

export const deleteOrder = (id) => async (dispatch, getState) => {
    dispatch({type: ORDER_DELETE_REQUEST});
    try {
        const token = getState().auth.userInfo.access
        const config = {
            headers: {
                authorization: `Bearer ${token}`,
            }
        }
        const {data} = await Axios.delete(`${process.env.REACT_APP_API_URL}/api/orders/${id}`, config
        );
        dispatch({type: ORDER_DELETE_SUCCESS, payload: data})
        dispatch(setAlert('Deleted successfully', 'danger'))
    } catch (error) {
        dispatch({
            type: ORDER_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }

}
