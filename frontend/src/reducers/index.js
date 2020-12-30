import {combineReducers} from 'redux'
import {alertReducer} from './alertReducers'
import {authReducer} from './authReducers'
import {productListReducer, productDetailsReducer} from './productReducers'
import {cartReducer} from "./cartReducers";

export default combineReducers({
    alert :alertReducer,
    auth :authReducer,
    productList : productListReducer,
    productDetails :productDetailsReducer ,
    cart:cartReducer

})