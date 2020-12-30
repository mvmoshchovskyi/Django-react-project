import {CART_ADD_ITEM, CART_REMOVE_ITEM} from "../constants/cartConstants";
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