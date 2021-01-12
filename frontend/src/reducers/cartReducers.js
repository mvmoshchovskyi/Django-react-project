import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD
} from "../constants/cartConstants";

const initialState = {
    cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
    shippingAddress: localStorage.getItem('shippingAddress')
        ? JSON.parse(localStorage.getItem('shippingAddress'))
        : {},
    paymentMethod: 'liqPay'
}

export const cartReducer = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case CART_ADD_ITEM:
            const item = payload
            const existsItem = state.cartItems.find(x => x.product === item.product)
            if (existsItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => {
                        return (x.product === existsItem.product ? item : x)
                    })
                }
            } else {
                return {...state, cartItems: [...state.cartItems, item]}
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== payload),
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: payload
            }
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: payload
            }
        default:
            return state
    }
}