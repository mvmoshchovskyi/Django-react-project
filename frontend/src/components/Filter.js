import React from "react";
import {connect} from "react-redux";
import {filterProducts} from "../actions/productActions";

const Filter = ({sex, filterProducts, totalResults}) => {

    // return !totalResults ? (
    //     <div>Loading...</div>
    // ) :
    //
    return (
        <div className="filter">
            <div className="filter-result">
                {totalResults} item
            </div>
            <div className="filter-size">
                Filter{" "}
                <select
                    value={sex}
                    onChange={(e) =>
                        filterProducts(e.target.value)
                    }
                >
                    <option value="">ALL</option>
                    <option value="Man">MAN</option>
                    <option value="Woman">WOMAN</option>
                </select>
            </div>
        </div>
    );
}

export default connect(
    (state) => ({
        sex: state.productList.sex,
        loading: state.productList.loading,
        error: state.productList.error,
        totalResults: state.productList.totalResults,
    }),
    {
        filterProducts,
    }
)(Filter);