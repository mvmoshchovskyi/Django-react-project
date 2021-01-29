import React from "react";

import { LiqPayPay} from "react-liqpay";

const LiqPayButton =()=>{

  // const payInfo = {
  //   amount: 999,
  //   currency: 'USD',
  //   title: 'PAY'
  // }

  // const ButtonComponent = () => (
  //   <button style={{
  //     backgroundColor: '#337ab7',
  //     color: '#fff',
  //     borderColor: '#2e6da4',
  //     border: '1px solid transparent',
  //     borderRadius: '4px',
  //     padding: '6px 12px',
  //     cursor: 'pointer'
  //   }}>
  //     {`${payInfo.title} ${payInfo.amount} ${payInfo.currency}`}
  //   </button>
  // )

    return (
      <div style={{ display: "flex" }}>
        <LiqPayPay
          publicKey={process.env.REACT_APP_PUBLIC_KEY}
          privateKey={process.env.REACT_APP_PRIVATE_KEY}
          amount="3"
          description="Payment for product"
          currency="UAH"
          orderId={Math.floor(1 + Math.random() * 900000000)}
          result_url="http://domain.com/user/account"
          server_url="http://server.domain.com/liqpay"
          product_description="Online courses"
          style={{ margin: "8px" }}
          disabled={false}
        />
      </div>
    );
  }

export default LiqPayButton
