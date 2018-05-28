import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import Layout from "../components/Layout/Layout";

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={props =>{
        const C = isAuthenticated ?<Layout> <Redirect to="/" /></Layout> : <Component {...props} />
        return C
    }

    }
  />
);

const mapStateToProps = state => ({
  isAuthenticated: false
});

export default connect(mapStateToProps)(PublicRoute);
