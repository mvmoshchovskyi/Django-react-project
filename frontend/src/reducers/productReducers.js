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

const initialState = {
    products: [],
    product: {},
    loading: false,
    error: false,
    totalResults:0,
    next:null,
    previous:null,
    currentPage: 1
}
export const productListReducer = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case PRODUCT_LIST_REQUEST:
            return {loading: true};
        case PRODUCT_LIST_SUCCESS:
            return { ...state,
                loading: false,
                products: payload.results,
                totalResults:payload.count,
                next:payload.next,
                previous:payload.previous
            };
        case NUMBER_PAGES:
            return {...state,currentPage: payload}
        case PRODUCT_LIST_FAIL:
            return {loading: false, error:payload};
        case PRODUCT_SEARCH_REQUEST:
            return {loading: true};
        case PRODUCT_SEARCH_SUCCESS:
            return {loading: false, products: payload};
        case PRODUCT_SEARCH_FAIL:
            return {loading: false, error: payload};
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
            return {loading: false, product: payload};
        case PRODUCT_DETAILS_FAIL:
            return {loading: false, error: payload};
        default:
            return state;
    }
}

// export const productSearchReducer = (state = initialState, action) => {
//     const {type, payload} = action
//     switch (type) {
//         case PRODUCT_SEARCH_REQUEST:
//             return {loading: true};
//         case PRODUCT_SEARCH_SUCCESS:
//             return {loading: false, products: payload};
//         case PRODUCT_SEARCH_FAIL:
//             return {loading: false, error: payload};
//         default:
//             return state;
//     }
// }