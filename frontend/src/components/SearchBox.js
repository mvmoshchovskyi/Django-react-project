import React, {useState} from 'react';
import {connect} from "react-redux";
import {productSearch} from "../actions/productActions";
import PropTypes from "prop-types";


const SearchBox = ({productSearch}) => {

    const [searchKeyword, setSearchKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        productSearch(searchKeyword)
        setSearchKeyword('')


    }

    return (
        <form className="search" onSubmit={submitHandler} >
            <div className="row">
                <input
                    name="searchKeyword"
                    placeholder='search'
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <button className="primary" type="submit">
                    <i className="fa fa-search"></i>
                </button>
            </div>
        </form>
    );
}
SearchBox.propTypes = {
    productSearch: PropTypes.func,
}
const mapStateToProps = state => ({})
export default connect(mapStateToProps, {productSearch})(SearchBox)