import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_RESET,

    ORDER_DELETE_REQUEST,
    ORDER_DELETE_SUCCESS,
    ORDER_DELETE_FAIL,
} from "../constants/orderConstnts";

const initialState = {
    orderDetail: {},
    // orderDetail: localStorage.getItem('orderDetail')
    //     ? JSON.parse(localStorage.getItem('orderDetail'))
    //     : {},
    loading: true,
    error: false,
}
export const orderCreateReducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {loading: true};
        case ORDER_CREATE_SUCCESS:
            return {
                ...state,
                loading: false, error: false, orderDetail: action.payload
            }
        case ORDER_CREATE_FAIL:
            return {loading: false, error: action.payload,};
        case ORDER_DELETE_REQUEST:
            return {loading: true};
        case ORDER_DELETE_SUCCESS:
            return {
            ...state,
                loading: false, error: false, orderDetail: action.payload
            }
        case ORDER_DELETE_FAIL:
            return {loading: false, error: action.payload,};
        case ORDER_CREATE_RESET:
            return {};
        default:
            return state;
    }
}