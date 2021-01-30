import {
    ADDRESS_CREATE_REQUEST,
    ADDRESS_CREATE_SUCCESS,
    ADDRESS_CREATE_FAIL
} from "../constants/addressConstants";


const initialState = {
    shippingAddress: localStorage.getItem('shippingAddress')
        ? JSON.parse(localStorage.getItem('shippingAddress'))
        : {},
    loading: false,
    error: false
}

export const addressReducer = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case ADDRESS_CREATE_REQUEST:
            return {loading: true};
        case ADDRESS_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                shippingAddress: payload
            }
        case ADDRESS_CREATE_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state
    }
}

