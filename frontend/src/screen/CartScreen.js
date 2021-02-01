import React, {useEffect} from 'react';
import {useParams, useLocation, Link, useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {addToCart, removeFromCart,checkoutHandler} from "../actions/cartActions";
import MessageBox from "../components/MessageBox";
import PropTypes from "prop-types";
import {formatCurrency} from "../utils";

const CartScreen = ({userInfo, cartItems, addToCart, removeFromCart,   shippingAddress, checkoutHandler}) => {
    const {cartId} = useParams()
    let history = useHistory();
    let location = useLocation();
    const qty = location.search
        ? Number(location.search.split('=')[1])
        : 1;

    useEffect(() => {
        if (cartId) {
            addToCart(cartId, qty)
        }
    }, [addToCart, cartId, qty])

    const removeFromCartHandler = (id) => {
        removeFromCart(id)
    };

    const checkout = () => {
        // checkoutHandler()

    userInfo ? history.push('/shipping') : history.push('/signin?redirect=shipping')


    }

    return (
        <div className="row top">
            <div className="col-2">
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <MessageBox>
                        Cart is empty. <Link to="/">Go Shopping</Link>
                    </MessageBox>
                ) : (
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
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </div>
                                    <div>
                                        <select
                                            value={item.qty}
                                            onChange={(e) =>
                                                addToCart(item.product, Number(e.target.value))
                                            }
                                        >
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>${item.price}</div>
                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => removeFromCartHandler(item.product)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>
                                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) :
                                {formatCurrency(cartItems.reduce((a, c) => a + c.price * c.qty, 0))}
                            </h2>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={checkout}
                                className="primary block"
                                disabled={cartItems.length === 0}
                            >
                                Proceed to Checkout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
CartScreen.propTypes = {
    cartItems: PropTypes.array,
    userInfo: PropTypes.string,
    addToCart: PropTypes.func,
    removeFromCart: PropTypes.func,
}
const mapDispatchToProps = state => ({
    cartItems: state.cart.cartItems,
    userInfo: state.auth.userInfo.name,
      shippingAddress: state.address.shippingAddress,
})
export default connect(mapDispatchToProps, {addToCart, removeFromCart, checkoutHandler})(CartScreen);