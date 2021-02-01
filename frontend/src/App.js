import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Layout from './hocs/Layout'
import ProductScreen from "./screen/ProductScreen";
import HomeScreen from "./screen/HomeScreen";
import CartScreen from "./screen/CartScreen";
import SignInScreen from "./screen/SignInScreen";
import RegisterScreen from "./screen/RegisterScreen";
import ShippingAddressScreen from "./screen/ShippingAddressScreen";
import PaymentMethodScreen from "./screen/PaymentMethodScreen";
import PlaceOrderScreen from "./screen/PlaceOrderScreen";
import LiqPayButton from "./screen/LiqPayButton";


function App() {
    return (
        <Router>
            <Layout>
                <main>
                    <Switch>
                        <Route exact path='/cart/:cartId?'> <CartScreen/> </Route>
                        <Route exact path="/product/:productId"> <ProductScreen/> </Route>
                        <Route exact path='/signin'><SignInScreen/> </Route>
                        <Route exact path="/register"><RegisterScreen/></Route>
                        <Route exact path="/shipping"> <ShippingAddressScreen/> </Route>
                         <Route exact path="/payment"> <PaymentMethodScreen/> </Route>
                        <Route exact path="/placeorder"> <PlaceOrderScreen/> </Route>
                        <Route exact path="/liqpay"> <LiqPayButton/> </Route>
                        <Route exact path="/category/:id"> <HomeScreen/> </Route>
                        <Route exact path="/"> <HomeScreen/> </Route>
                    </Switch>
                </main>
                <footer className="row center">Developed by Moshchovskyi Mykhailo</footer>
            </Layout>
        </Router>
    );
}

export default App;