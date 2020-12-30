import React, {useEffect} from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux'
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import Product from '../components/Product';
import {listProducts} from "../actions/productActions";

const HomeScreen = ({products,loading,error,listProducts}) => {

    useEffect(()=>{
        listProducts()
    },[listProducts])

    return (
        <div>
            {loading
                ? <LoadingBox></LoadingBox>
                : error
                    ? <MessageBox variant='danger'>{error}</MessageBox>
                    : (<div className="row center">
                        {products.map((product) => (
                            <Product key={product.id} product={product}></Product>
                        ))}
                    </div>)}
        </div>
    );
}
HomeScreen.propTypes = {
    login: PropTypes.func,
    products: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.bool,
}

const mapStateToProps = state => ({
    products: state.productList.products,
    loading: state.productList.loading,
    error: state.productList.error
})
export default connect(mapStateToProps ,{listProducts})(HomeScreen)