import React, {useState} from 'react';
import {connect} from 'react-redux';
import { savePaymentMethod} from '../actions/cartActions';
import CheckoutSteps from "../components/CheckautSteps";
import PropTypes from "prop-types";
import {useHistory} from "react-router-dom";

const PaymentMethodScreen = ({savePaymentMethod, shippingAddress}) => {


    const [paymentMethod, setPaymentMethod] = useState('liqPay');

    let history = useHistory()
    //
    // if (!shippingAddress) {
    //     history.push('/shipping');
    // }
    const submitHandler = (e) => {
        e.preventDefault();
        savePaymentMethod(paymentMethod)
        history.push('/placeorder');
    };
    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>

            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Payment Method</h1>
                </div>
                <div>
                    <div>
                        <input
                            type="radio"
                            id="liqPay"
                            value="liqPay"
                            name="paymentMethod"
                            required
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></input>
                        <label htmlFor="liqPay">LiqPay</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input
                            type="radio"
                            id="creditCard"
                            value="creditCard"
                            name="paymentMethod"
                            required
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></input>
                        <label htmlFor="creditCard">Credit Card</label>
                    </div>
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">
                        Continue
                    </button>
                </div>
            </form>
        </div>
    );
}
PaymentMethodScreen.propTypes = {
    shippingAddress: PropTypes.object,
    savePaymentMethod: PropTypes.func
}
const mapStateToProps = state => ({
   shippingAddress: state.address.shippingAddress,
})
export default connect(mapStateToProps, {savePaymentMethod})(PaymentMethodScreen)