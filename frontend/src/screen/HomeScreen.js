import React, {useEffect} from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux'
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import Product from '../components/Product';
import Pagination from "../components/Pagination";
import {listProducts} from "../actions/productActions";

const HomeScreen = ({products, loading, error, listProducts, totalResults}) => {

    useEffect(() => {
        listProducts()
    }, [listProducts])


    return (
        <>
            {loading
                ? <LoadingBox></LoadingBox>
                : error
                    ? <MessageBox variant='danger'>{error}</MessageBox>
                    :

                    (
                    <div className="row center">

                        {products.map((product) => (
                            <Product key={product.id} product={product}></Product>
                        ))}
                    </div>)}
            {
                totalResults > 2 &&
                <Pagination/>

            }
        </>
    );
}
HomeScreen.propTypes = {
    products: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    totalResults: PropTypes.number,
    listProducts: PropTypes.func,
}

const mapStateToProps = state => ({
    products: state.productList.products,
    loading: state.productList.loading,
    error: state.productList.error,
    totalResults: state.productList.totalResults,
})
export default connect(mapStateToProps, {listProducts})(HomeScreen)