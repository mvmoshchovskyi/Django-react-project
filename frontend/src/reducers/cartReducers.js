import {CART_ADD_ITEM, CART_REMOVE_ITEM} from "../constants/cartConstants";

const initialState = {
            cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
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
        default:
            return state
    }
}