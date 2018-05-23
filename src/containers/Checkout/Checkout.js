import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0
  };
  componentDidMount() {
    console.log('componentDidMount ingredients');
    const query = new URLSearchParams(this.props.location.search);
    let price = 0;
    const ingredients = {};
    for (let param of query.entries()) {
      if (param[0] === 'price') {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1]; // add + in front a number, else will consider string
      }
    }
    this.setState(() => ({ ingredients: ingredients, price: price }));
  }

  checkoutCancelHandler = () => {
    console.log('checkoutCancelHandler');
    console.log(this.props);
    this.props.history.goBack();
  };
  checkoutContinueHandler = () => {
    console.log('checkoutContinueHandler');
    console.log(this.props);
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelHandler}
          checkoutContinued={this.checkoutContinueHandler}
        />
        <Route
          path={this.props.match.path + '/contact-data'}
          render={() => (
            <ContactData
              {...this.props}
              totalPrice={this.state.price}
              ingredients={this.state.ingredients}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
