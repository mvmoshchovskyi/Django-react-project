import Axios from "axios";
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,

} from "../constants/orderConstnts";
import {CART_EMPTY} from "../constants/cartConstants";

export const createOrder = (order) => async (dispatch, getState) => {

    dispatch({type: ORDER_CREATE_REQUEST});
    try {
        const token = getState().auth.userInfo.access

        const config = {
            headers: {
                authorization: `Bearer ${token}`,
            }
        }
        const {data} = await Axios.post(`${process.env.REACT_APP_API_URL}/api/orders/create/`, order, config
        );

        dispatch({type: ORDER_CREATE_SUCCESS, payload: data});
        dispatch({type: CART_EMPTY});
            // localStorage.setItem('orderDetail', JSON.stringify(getState().order.orderDetail));
        localStorage.removeItem('cartItems');
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

export const placeOrder = (items, shippingData, billingData) => {
    return dispatch => {
        let totalPrice = 0
        let productsArr = []
        let quantitiesArr = []

        items.forEach((element) => {
            totalPrice += element.product.price * element.quantity
            productsArr.push(element.product.name)
            quantitiesArr.push(element.quantity)

            let updatedQuantity = element.product.quantity - element.quantity
            Axios.put(`/api/products/${element.product.id}/`, {
                category: element.product.category,
                name: element.product.name,
                price: element.product.price,
                quantity: updatedQuantity
            })
        })

        Axios.post('/api/orders/', {
            products: productsArr,
            quantities: quantitiesArr,
            total_price: totalPrice.toFixed(2),
            delivery_method: shippingData.deliveryMethod,
            payment_method: billingData.paymentMethod
        })
            .then((res) => {
                console.log(("Placing order successfully."));
            })

        // dispatch(clearCart())
        // if (shippingData.rememberDetails !== true) {
        //     dispatch(clearShippingOptions())
        // }
        //
        // dispatch(clearBillingOptions())
    }
}