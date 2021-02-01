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

    PRODUCT_FILTER_BY_SEX_REQUEST,
    PRODUCT_FILTER_BY_SEX_SUCCESS,
    PRODUCT_FILTER_BY_SEX_FAIL,
} from '../constants/productConstants'

export const listProducts = (number = 1) => async dispatch => {
    dispatch({
        type: PRODUCT_LIST_REQUEST,payload: number
    });
    try {
        const {data} = await Axios.get(`${process.env.REACT_APP_API_URL}/api/products/?page=${number}`);
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});

    } catch (error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message});
    }
};

export const productSearch = (name) => async dispatch => {

    dispatch({type: PRODUCT_SEARCH_REQUEST, payload: name});
    try {
            const {data} = await Axios.get(`${process.env.REACT_APP_API_URL}/api/products/search/?search=${name}`)
            dispatch({type: PRODUCT_SEARCH_SUCCESS, payload: data});
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

export const filterProducts = (sex ) => async dispatch => {

    dispatch({type: PRODUCT_FILTER_BY_SEX_REQUEST, payload: sex});
    try {
            const {data} = await Axios.get(`${process.env.REACT_APP_API_URL}/api/products/category/?sex=${sex}`)
            dispatch({type: PRODUCT_FILTER_BY_SEX_SUCCESS, payload: data});
    } catch (error) {
        dispatch({
            type: PRODUCT_FILTER_BY_SEX_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};




export const detailsProduct = (productId) => async (dispatch, getState) => {
    dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId});
    try {

        const {data} = await Axios.get(`${process.env.REACT_APP_API_URL}/api/products/${productId}`,);

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