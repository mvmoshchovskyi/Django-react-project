import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Layout from './hocs/Layout'
import ProductScreen from "./screen/ProductScreen";
import HomeScreen from "./screen/HomeScreen";
import CartScreen from "./screen/CartScreen";
import SignInScreen from "./screen/SignInScreen";
import RegisterScreen from "./screen/RegisterScreen";
import ShippingAddressScreen from "./screen/ShippingAddressScreen";

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
                        <Route exact path="/shipping" > <ShippingAddressScreen/> </Route>
                        <Route exact path="/"> <HomeScreen/> </Route>
                    </Switch>
                </main>
                <footer className="row center">All right reserved</footer>
            </Layout>
        </Router>
    );
}

export default App;