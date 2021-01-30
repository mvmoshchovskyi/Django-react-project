import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_PAYMENT_METHOD,
    // CART_CREATE_REQUEST,
    // CART_CREATE_SUCCESS,
    // CART_CREATE_FAIL
} from "../constants/cartConstants";
import Axios from "axios";


export const addToCart = (productId, qty) => async (dispatch, getState) => {


    const {data} = await Axios.get(`${process.env.REACT_APP_API_URL}/api/products/${productId}`);
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            product: data.id,
            qty
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({type: CART_REMOVE_ITEM, payload: productId});
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const savePaymentMethod = (data) => dispatch => {
    dispatch({type: CART_SAVE_PAYMENT_METHOD, payload: data});
}

export const checkoutHandler = () => async (dispatch, getState) => {
    // const token = getState().auth.userInfo.access
    // const cartItems = getState().cart.cartItems
    // dispatch({type: CART_CREATE_REQUEST, payload: cartItems});
    // try {
    //     const config = {
    //         headers: {
    //             authorization: `Bearer ${token}`,
    //         }
    //     }
    //     const {data} = await Axios.post(`${process.env.REACT_APP_API_URL}/api/carts/create/`, cartItems, config
    //     );
    //     dispatch({type: CART_CREATE_SUCCESS, payload: data});
    //     localStorage.setItem('cartItems', JSON.stringify(data))
    // } catch (error) {
    //     dispatch({
    //         type: CART_CREATE_FAIL,
    //         payload:
    //             error.response && error.response.data.message
    //                 ? error.response.data.message
    //                 : error.message,
    //     });
    // }
}