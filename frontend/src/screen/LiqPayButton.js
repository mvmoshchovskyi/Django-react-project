import React from "react";
import {LiqPayPay} from "react-liqpay";
import {connect,} from 'react-redux';
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {deleteOrder} from '../actions/orderActions'
import PropTypes from "prop-types";
import {useHistory} from "react-router-dom";


const LiqPayButton = ({orderDetail, loading, error, shippingAddress, deleteOrder}) => {

    let history = useHistory()
    const handleDelete = () => {
        deleteOrder(orderDetail.id)
        history.push('/')
    }
    const ButtonComponent = () => (
        <button style={{
            backgroundColor: 'green',
            color: '#fff',
            borderColor: '#2e6da4',
            border: '1px solid transparent',
            borderRadius: '6px',
            padding: '6px 12px',
            cursor: 'pointer',


        }}>

            {`Confirm & Payment`}
        </button>
    )
    return (
        <>
            {loading
                ? <LoadingBox></LoadingBox>
                : error
                    ? <MessageBox variant='danger'>{error}</MessageBox>
                    :
                    (
                        // <div className='liq_pay_pay'>

                        <div>
                            <div className="row top">
                                <div className="col-2">
                                    <ul>
                                        <li>
                                            <div className="card card-body">
                                                <h2>Shipping</h2>
                                                <p>
                                                    <strong>Name:</strong> {shippingAddress.first_name} {shippingAddress.last_name}<br/>
                                                    <strong>Address: </strong> {shippingAddress.address},
                                                    {shippingAddress.city}, {shippingAddress.postal_code}
                                                </p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="card card-body">
                                                <p>
                                                    <strong>Payment for Order N:</strong> {orderDetail.id}
                                                </p>
                                                <p>
                                                    <strong>Method:</strong> {orderDetail.payment_method}
                                                </p>
                                            </div>
                                        </li>

                                    </ul>
                                </div>
                                <div className="col-1">
                                    <div className="card card-body">
                                        <ul>
                                            <li>
                                                <h2>Order Summary</h2>
                                            </li>
                                            <li>
                                                <div className="row">
                                                    <div>Items price</div>
                                                    {orderDetail.items_price}
                                                </div>
                                            </li>
                                            <li>
                                                <div className="row">
                                                    <div>Delivery price</div>
                                                    {orderDetail.delivery_price}
                                                </div>
                                            </li>
                                            <li>
                                                <div className="row">
                                                    <div>
                                                        <strong> Order Total</strong>
                                                    </div>
                                                    <div>
                                                        <strong>${orderDetail.total_price}</strong>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='liq_pay_pay'>
                                <LiqPayPay
                                    publicKey={process.env.REACT_APP_PUBLIC_KEY}
                                    privateKey={process.env.REACT_APP_PRIVATE_KEY}
                                    description="Оплата за товар"
                                    orderId={Math.floor(1 + Math.random() * 900000000)}
                                    result_url="http://domain.com/user/account"
                                    server_url="http://server.domain.com/liqpay"
                                    product_description="Online shopping"
                                    amount={orderDetail.total_price}
                                    currency='UAH'
                                    style={{margin: "8px"}}
                                    extra={[<ButtonComponent key="1"/>]}
                                />
                            </div>
                            <div>
                                <button className='primary block' onClick={handleDelete}>Refuse from order</button>
                            </div>
                        </div>)}
        </>
    );
}


LiqPayButton.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.bool,
    order: PropTypes.object
}

const mapStateToProps = state => ({
    loading: state.order.loading,
    error: state.order.error,
    orderDetail: state.order.orderDetail,
    shippingAddress: state.address.shippingAddress
})
export default connect(mapStateToProps, {deleteOrder})(LiqPayButton)