import Axios from "axios";
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_SEARCH_REQUEST,
    PRODUCT_SEARCH_SUCCESS,
    PRODUCT_SEARCH_FAIL,

    NUMBER_PAGES
} from '../constants/productConstants'

export const listProducts = (number=1) => async dispatch => {
    dispatch({
        type: PRODUCT_LIST_REQUEST,
    });
    try {
        const {data} = await Axios.get(`${process.env.REACT_APP_API_URL}/api/products/?page=${number}`);
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
        dispatch({type: NUMBER_PAGES, payload: number});
    } catch (error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message});
    }
};
export const detailsProduct = (productId) => async dispatch => {
    dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId});
    try {
        const {data} = await Axios.get(`${process.env.REACT_APP_API_URL}/api/products/${productId}`);

        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data});
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
export const productSearch = (name) => async dispatch => {
    dispatch({type: PRODUCT_SEARCH_REQUEST, payload: name});
    try {
        const {data} = await Axios.get(`${process.env.REACT_APP_API_URL}/api/products/search/?search=${name}`)

        dispatch({type: PRODUCT_SEARCH_SUCCESS, payload: data.results});
    } catch (error) {
        dispatch({
            type: PRODUCT_SEARCH_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
export const findListProductsByNumber = (number) => async dispatch => {
    dispatch({
        type: PRODUCT_LIST_REQUEST,
    });
    try {
        const {data} = await Axios.get(`${process.env.REACT_APP_API_URL}/api/products/?page=${number}`);
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message});
    }
};
