import React from 'react';
import {connect,} from 'react-redux';
import {Link, useHistory, Redirect} from 'react-router-dom';
import CheckoutSteps from "../components/CheckautSteps";
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import PropTypes from "prop-types";
import {createOrder} from '../actions/orderActions'


const PlaceOrderScreen = ({shippingAddress, paymentMethod, loading, error, cart, createOrder}) => {
    console.log(shippingAddress)
    let history = useHistory()
    if (!paymentMethod) {
        history.push('/payment');
    }

    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(
        cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    );
    cart.delivery = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.delivery;

    const placeOrderHandler = () => {
        // createOrder({ ...cart, orderItems: cart.cartItems })
        createOrder({
            items_price: cart.itemsPrice,
            total_price: cart.totalPrice,
            delivery_price: cart.delivery,
            payment_method: paymentMethod
        })

        history.push('/liqpay');
    }


    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong> {cart.shippingAddress.firstName} {cart.shippingAddress.lastName}<br/>
                                    <strong>Address: </strong> {cart.shippingAddress.address},
                                    {cart.shippingAddress.city}, {shippingAddress.postalCode}
                                    ,{cart.shippingAddress.country}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method:</strong> {paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                                    {cart.cartItems.map((item) => (
                                        <li key={item.product}>
                                            <div className="row">
                                                <div>
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="small"
                                                    ></img>
                                                </div>
                                                <div className="min-30">
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </div>

                                                <div>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Items</div>
                                    <div>${cart.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Delivery</div>
                                    <div>${cart.delivery.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>
                                        <strong> Order Total</strong>
                                    </div>
                                    <div>
                                        <strong>${cart.totalPrice.toFixed(2)}</strong>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={placeOrderHandler}
                                    className="primary block"
                                    disabled={cart.cartItems.length === 0}
                                >
                                   Buy Order
                                </button>
                            </li>
                            {loading && <LoadingBox></LoadingBox>}
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
PlaceOrderScreen.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.bool,
    shippingAddress: PropTypes.object,
    paymentMethod: PropTypes.string,
    cart: PropTypes.object,
    createOrder: PropTypes.func
}
const mapStateToProps = state => ({
    loading: state.productList.loading,
    error: state.productList.error,
    shippingAddress: state.cart.shippingAddress,
    paymentMethod: state.cart.paymentMethod,
    cart: state.cart,

})
export default connect(mapStateToProps, {createOrder})(PlaceOrderScreen)