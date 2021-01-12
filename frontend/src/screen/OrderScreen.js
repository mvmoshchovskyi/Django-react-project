import React,  from 'react';
import {connect, } from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import CheckoutSteps from "../components/CheckautSteps";
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import PropTypes from "prop-types";
import {saveShippingAddress} from "../actions/cartActions";

const OrderScreen = ({shippingAddress, paymentMethod, cartItems, success, error, order, cart}) => {

    const orderId = useParams()

    // useEffect(()=>{
    //     detailsOrder(orderId)
    // },[ detailsOrder,orderId])


    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(
        cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    );
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const placeOrderHandler = () => {
        // createOrder({...cart, orderItems: cart.cartItems})
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
                                    <strong>Name:</strong> {shippingAddress.fullName} <br/>
                                    <strong>Address: </strong> {shippingAddress.address},
                                    {shippingAddress.city}, {shippingAddress.postalCode}
                                    ,{shippingAddress.country}
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
                                    {cartItems.map((item) => (
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
                                    <div>Shipping</div>
                                    <div>${cart.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tax</div>
                                    <div>${cart.taxPrice.toFixed(2)}</div>
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
                                    Place Order
                                </button>
                            </li>
                            {/*{loading && <LoadingBox></LoadingBox>}*/}
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
OrderScreen.propTypes = {
    product: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
    saveShippingAddress:PropTypes.func
}
const mapStateToProps = state => ({
    product: state.productDetails.product,
    loading: state.productDetails.loading,
    error: state.productDetails.error,
    cartItems: state.cart.cartItems,
    shippingAddress: state.cart.shippingAddress,
    paymentMethod: state.cart.paymentMethod,
    cart: state.cart,
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, {saveShippingAddress})(OrderScreen)