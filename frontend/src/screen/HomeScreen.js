import React, {useEffect} from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux'
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import Product from '../components/Product';
import Pagination from "../components/Pagination";
import {listProducts,productSearch} from "../actions/productActions";
import SearchBox from "../components/SearchBox";
import Filter from "../components/Filter";

const HomeScreen = ({products, loading, error, listProducts, totalResults,}) => {

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
                        <div>
                            <div className='search_box'>
                                <SearchBox/>
                                <Filter/>
                            </div>
                            <div className="row center">
                                {products.map((product) => (
                                    <Product key={product.id} product={product}></Product>
                                ))}
                            </div>

                        </div>

                    )}
            {
                totalResults > 6 &&
                <Pagination />

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
export default connect(mapStateToProps, {listProducts,productSearch})(HomeScreen)