import React, {useState} from 'react';
import {connect} from 'react-redux';
import {saveShippingAddress} from '../actions/addressActions';
import CheckoutSteps from "../components/CheckautSteps";
import PropTypes from "prop-types";
import {useHistory} from "react-router-dom";

const ShippingAddressScreen = ({saveShippingAddress, user}) => {

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        address: '',
        city: '',
        postal_code: '',
        phone: '',
    })
    let history = useHistory()

    if (!user) {
        history.push('/signin');
    }

    const submitHandler = (e) => {
        e.preventDefault();
        saveShippingAddress(formData)
        history.push('/payment');

    };
    const onChangeHandler = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Shipping Address</h1>
                </div>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name='first_name'
                        placeholder="Enter first name"
                        // value={fullName}
                        onChange={(e) => onChangeHandler(e)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="last_name"
                        placeholder="Enter last name"
                        // value={country}
                        onChange={(e) => onChangeHandler(e)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Enter address"
                        // value={address}
                        onChange={(e) => onChangeHandler(e)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        name='city'
                        placeholder="Enter city"
                        // value={city}
                        onChange={(e) => onChangeHandler(e)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="postalCode">Postal Code</label>
                    <input
                        type="text"
                        id="postalCode"
                        name='postal_code'
                        placeholder="Enter postal code"
                        // value={postalCode}
                        onChange={(e) => onChangeHandler(e)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder="Enter phone"
                        // value={country}
                        onChange={(e) => onChangeHandler(e)}
                        required
                    ></input>
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
ShippingAddressScreen.propTypes = {
    saveShippingAddress: PropTypes.func,

}
const mapStateToProps = state => ({
    user: state.auth.userInfo
})
export default connect(mapStateToProps, {saveShippingAddress})(ShippingAddressScreen)