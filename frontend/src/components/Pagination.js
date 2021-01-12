import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {listProducts} from "../actions/productActions";


const Pagination = ({currentPage, totalResults, listProducts}) => {

    const numberPages = Math.floor(totalResults / 2);

    let items = [];
    let maxPages = numberPages;
    let leftSide = currentPage - 2;
    if (leftSide <= 0) leftSide = 1;

    let rightSide = currentPage + 2;
    if (rightSide > maxPages) rightSide = maxPages;

    for (let i = leftSide; i <= rightSide; i++) {
        items.push(
            <div
                key={i}
                className={(i === currentPage ? 'round-effect active' : 'round-effect')}
                onClick={() => {
                    listProducts(i);
                }}>
                {i}
            </div>
        );
    }

    const nextPage = () => {
        if (currentPage < maxPages) {

            listProducts(currentPage + 1)
        }
    }

    const prevPage = () => {
        if (currentPage > 1) {

            listProducts(currentPage - 1)
        }
    }

    return (
        <div className="pagination-container">
            <div className="paginate-ctn">

                <div className="round-effect" onClick={prevPage}> &#10094; </div>
                {items}
                <div className="round-effect" onClick={nextPage}> &#10095; </div>
            </div>
        </div>
    );
};
Pagination.propTypes = {
    cartItems: PropTypes.array,
    listProducts: PropTypes.func,
    totalResults: PropTypes.number,
    currentPage: PropTypes.number
}
const mapStateToProps = state => ({
    totalResults: state.productList.totalResults,
    currentPage: state.productList.currentPage,

})
export default connect(mapStateToProps, {listProducts})(Pagination)