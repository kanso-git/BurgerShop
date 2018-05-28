import React from 'react';
import Orders from '../containers/Orders/Orders';
import BurgerBuilder from '../containers/BurgerBuilder/BurgerBuilder';
import Checkout from '../containers/Checkout/Checkout';
import ContactDataFormik from '../containers/Checkout/ContactData/ContactDataFormik';
import { Route, Switch, withRouter } from 'react-router-dom';
import PublicRoute from './PublicRoute';

const AppRouter = () => {
  return (
    <Switch>
      <PublicRoute path="/checkout" component={Checkout} />
      <Route path="/orders" component={Orders} />
      <Route path="/formik" component={ContactDataFormik} />
      <Route path="/" exact component={BurgerBuilder} />
    </Switch>
  );
};

export default AppRouter;
