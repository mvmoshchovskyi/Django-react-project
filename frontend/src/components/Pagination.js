import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {listProducts, productSearch,filterProducts} from "../actions/productActions";


const Pagination = ({currentPage, totalResults, listProducts, sex,filterProducts}) => {
    console.log('SEX',sex)
    const numberPages = Math.floor(totalResults / 6);

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

                <div className={leftSide === currentPage ? '' : `round-effect`}
                     onClick={prevPage}> {leftSide !== currentPage ? '<' : ''} </div>
                {items}
                <div className={rightSide === currentPage ? '' : `round-effect`}
                     onClick={nextPage}> {rightSide !== currentPage ? '>' : ''} </div>
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
    next: state.productList.next,
    previous: state.productList.next,
    sex: state.productList.sex,

})
export default connect(mapStateToProps, {listProducts, productSearch,filterProducts})(Pagination)