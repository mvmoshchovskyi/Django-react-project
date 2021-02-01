import React from 'react';
import { Link, } from "react-router-dom";
import {connect,} from "react-redux";
import {logout} from "../actions/authActions";
import PropTypes from "prop-types";
import Alert from "./Alert";


const Navbar = ({cartItems, userInfo, logout, }) => {

    const signoutHandler = () => {
        logout();
    }

    return (
        <div>
            <header className="row">
                <div>
                    <Link className="brand" to="/">
                       Shop
                    </Link>
                </div>

                <div>
                    <Link to="/cart">
                        Cart
                        {cartItems.length > 0 && (
                            <span className="badge">{cartItems.length}</span>
                        )}
                    </Link>

                    {userInfo ? (
                        <div className="dropdown">
                            <Link to="#">
                                {userInfo} <i className="fa fa-caret-down"></i>{' '}
                            </Link>
                            <ul className="dropdown-content">
                                <li>
                                    <Link to="#signout" onClick={signoutHandler}>
                                        Log Out
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <Link to="/signin">Sign In</Link>
                    )}
                </div>
            </header>
            <Alert/>
        </div>
    );
}

Navbar.propTypes = {
    cartItems: PropTypes.array,
    userInfo: PropTypes.string,
    logout: PropTypes.func,


}
const mapStateToProps = state => ({
    cartItems: state.cart.cartItems,
    userInfo: state.auth.userInfo.name

})
export default connect(mapStateToProps, {logout})(Navbar)
