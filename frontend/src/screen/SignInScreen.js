import React, {useEffect, useState} from 'react';
import {Link, useHistory, useLocation} from 'react-router-dom';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {login} from "../actions/authActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const SignInScreen = ({login, isAuthenticated, error, loading}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',

    })
    const {email, password} = formData

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const submitHandler = e => {
        e.preventDefault()
        login(email, password)
    }
    let location = useLocation();
    let history = useHistory()
    const redirect = location.search
        ? location.search.split('=')[1]
        : '/';


    useEffect(() => {
        if (isAuthenticated) {
            history.push(redirect)
        }
    }, [isAuthenticated, history, redirect])
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Sign In</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant='danger'>{error}</MessageBox>}
                {}
                <div>
                    <label htmlFor="email">Email address</label>
                    <input
                        type='email'
                        placeholder='Email'
                        name='email' value={email}
                        onChange={e => onChange(e)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        minLength='6'
                    ></input>
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">
                        Sign In
                    </button>
                </div>
                <div>
                    <label/>
                    <div>
                        New customer?{' '}
                        <Link to={`/register?redirect=${redirect}`}>
                            Create your account
                        </Link>

                    </div>
                </div>
            </form>
        </div>
    );
}
SignInScreen.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool,
    error: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.productDetails.loading,
    error: state.productDetails.error
})
export default connect(mapStateToProps, {login})(SignInScreen)