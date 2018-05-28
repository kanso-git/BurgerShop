import React from 'react';
import Orders from '../containers/Orders/Orders';
import BurgerBuilder from '../containers/BurgerBuilder/BurgerBuilder';
import Checkout from '../containers/Checkout/Checkout';
import ContactDataFormik from '../containers/Checkout/ContactData/ContactDataFormik';
import {Route, Switch} from 'react-router-dom';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import Login from "../containers/Login/Login";

const AppRouter = () => {
    return (
        <Switch>
            <PublicRoute path="/login" exact component={Login}/>
            <PrivateRoute path="/checkout" component={Checkout}/>
            <PrivateRoute path="/orders" component={Orders}/>
            <PrivateRoute path="/formik" component={ContactDataFormik}/>
            <PrivateRoute path="/" exact component={BurgerBuilder}/>
        </Switch>
    );
};

export default AppRouter;
