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

const initialState = {
    products: [],
    product: {},
    loading: false,
    error: false,
    totalResults: 0,
    next: null,
    previous: null,
    currentPage: 1,
}
export const productListReducer = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case PRODUCT_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                currentPage: payload
            }
        case PRODUCT_SEARCH_REQUEST:
        case PRODUCT_FILTER_BY_SEX_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case PRODUCT_LIST_SUCCESS:
        case PRODUCT_SEARCH_SUCCESS:
        case PRODUCT_FILTER_BY_SEX_SUCCESS:
            return {
                ...state,
                loading: false,
                products: payload.results,
                totalResults: payload.count,
                next: payload.next,
                previous: payload.previous
            };
        case PRODUCT_SEARCH_FAIL:
        case PRODUCT_LIST_FAIL:
        case PRODUCT_FILTER_BY_SEX_FAIL:
            return {loading: false, error: true};
        default:
            return state;
    }
};

export const productDetailsReducer = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case PRODUCT_DETAILS_REQUEST:
            return {loading: true};
        case PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false, product: payload
            };
        case PRODUCT_DETAILS_FAIL:
            return {loading: false, error: payload};

        default:
            return state;
    }
}

