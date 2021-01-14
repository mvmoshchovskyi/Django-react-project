import React, {useEffect, useState} from 'react';
import {Link, useHistory, useLocation,} from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {setAlert} from '../actions/alertActions';
import {signUp} from '../actions/authActions';
import PropTypes from 'prop-types';
import {connect} from "react-redux";


const RegisterScreen = ({setAlert, signUp, isAuthenticated, loading, error}) => {
	const initialFormData = Object.freeze({
		email: '',
		username: '',
		password: '',
        password2: ''
	});


    const [formData, setFormData] = useState({
        initialFormData
        // name: '',
        // email: '',
        // password: '',
        // password2: ''
    });

    const {name, email, password, password2} = formData;

    const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value.trim()});
    console.log(initialFormData.username)
    const submitHandler = e => {
        e.preventDefault();

        if (password !== password2)
            setAlert('Passwords do not match', 'error');
        else
            signUp({name, email, password, password2});
    };

    let history = useHistory();
    let location = useLocation();
    const redirect = location.search
        ? location.search.split('=')[1]
        : '/';


    useEffect(() => {
        if (isAuthenticated) {
            history.push(redirect);
        }
        // history.push('login')
    }, [history, redirect, isAuthenticated]);

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Create Account</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type='text'
                        placeholder='Name'
                        name='name'
                        // value={name}
                        onChange={handleChange}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="email">Email address</label>
                    <input
                        id="email"
                        type='email'
                        placeholder='Email'
                        name='email'
                        // value={email}
                        onChange={handleChange}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type='password'
                        placeholder='Password'
                        name='password'
                        // value={password}
                        onChange={handleChange}
                        minLength='6'
                    ></input>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        type='password'
                        placeholder='Confirm Password'
                        name='password2'
                        // value={password2}
                        onChange={handleChange}
                        minLength='6'
                    ></input>
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">
                        Register
                    </button>
                </div>
                <div>
                    <label/>
                    <div>
                        Already have an account?{' '}
                        <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
RegisterScreen.propTypes = {
    setAlert: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool,
    error: PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.productDetails.loading,
    error: state.productDetails.error
})

export default connect(mapStateToProps, {setAlert, signUp})(RegisterScreen);