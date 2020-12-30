import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useParams, useHistory} from 'react-router-dom'
import PropTypes from "prop-types";
import {connect} from 'react-redux'
import Rating from '../components/Rating';
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {detailsProduct} from "../actions/productActions";


const ProductScreen = ({ product, loading, error, detailsProduct}) => {
    const [qty, setQty] = useState(1)
    const {productId} = useParams()

    useEffect(() => {
        detailsProduct(productId)
    }, [detailsProduct, productId])

    let history = useHistory();
    const addToCartHandler = () => {
        history.push(`/cart/${productId}?qty=${qty}`);
    };
    return (
        <div>
            {loading
                ? <LoadingBox></LoadingBox>
                : error
                    ? <MessageBox variant='danger'>{error}</MessageBox>
                    : (
                        <div>
                            <Link to="/">Back to result</Link>
                            <div className="row top">
                                <div className="col-2">
                                    <img className="large" src={product.image} alt={product.name}></img>
                                </div>
                                <div className="col-1">
                                    <ul>
                                        <li>
                                            <h1>{product.name}</h1>
                                        </li>
                                        <li>
                                            <Rating
                                                rating={product.rating}
                                                numReviews={product.numReviews}
                                            ></Rating>
                                        </li>
                                        <li>Pirce : ${product.price}</li>
                                        <li>
                                            Description:
                                            <p>{product.description}</p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-1">
                                    <div className="card card-body">
                                        <ul>
                                            <li>
                                                <div className="row">
                                                    <div>Price</div>
                                                    <div className="price">${product.price}</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="row">
                                                    <div>Status</div>
                                                    <div>
                                                        {product.countInStock > 0 ? (
                                                            <span className="success">In Stock</span>
                                                        ) : (
                                                            <span className="danger">Unavailable</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </li>
                                            {
                                                product.countInStock > 0 && (
                                                    <>
                                                        <li>
                                                            <div className="row">
                                                                <div>QTY</div>
                                                                <div>
                                                                    <select
                                                                        value={qty}
                                                                        onChange={(e) => setQty(e.target.value)}
                                                                    >
                                                                        {[...Array(product.countInStock).keys()].map(
                                                                            (x) => (
                                                                                <option key={x + 1} value={x + 1}>
                                                                                    {x + 1}
                                                                                </option>
                                                                            )
                                                                        )}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <button onClick={addToCartHandler}
                                                                    className='primary block'> Add to Cart
                                                            </button>
                                                        </li>
                                                    </>
                                                )
                                            }

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
        </div>
    );
}
ProductScreen.propTypes = {
    product: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.bool,
}
const mapStateToProps = state => ({
    product: state.productDetails.product,
    loading: state.productDetails.loading,
    error: state.productDetails.error
})
export default connect(mapStateToProps, {detailsProduct})(ProductScreen)