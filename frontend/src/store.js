import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from "redux-thunk";
import rootReducer from './reducers'

const initialState = {

   // auth: {
   //      userInfo: localStorage.getItem('userInfo')
   //          ? JSON.parse(localStorage.getItem('userInfo'))
   //          : null,
   //  },
   //  cart: {
   //      cartItems: localStorage.getItem('cartItems')
   //          ? JSON.parse(localStorage.getItem('cartItems'))
   //          : [],
   //  }
}

const middleware = [thunk]

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)
export default store