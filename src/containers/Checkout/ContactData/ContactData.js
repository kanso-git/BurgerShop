import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: 'bou me3za',
        address: {
          street: 'malek el me3za',
          zipCode: '3434',
          country: 'zuetres'
        },
        email: 'ma3eeyha@meza.sh'
      },
      deliveryMethod: 'mde'
    };
    this.setState(() => ({ loading: true }));
    axios
      .post('/orders.json', order)
      .then(response => {
        if (response.status !== 404) {
          this.setState(prevState => ({
            loading: false
          }));
          this.props.history.push('/');
        } else {
          this.setState(prevState => ({
            loading: false
          }));
        }
      })
      .catch(e => {
        this.setState(prevState => ({
          loading: false
        }));
      });
  };
  render() {
    let formElements = (
      <div className={classes.ContcatData}>
        <h4>Enter your contact data</h4>
        <form>
          <input
            type="text"
            className={classes.Input}
            name="name"
            placeholder="Your Name"
          />
          <input
            type="email"
            className={classes.Input}
            name="email"
            placeholder="Your Email"
          />
          <input
            type="text"
            className={classes.Input}
            name="street"
            placeholder="Your Street"
          />
          <input
            type="text"
            className={classes.Input}
            name="postal"
            placeholder="your Postal"
          />

          <Button btnType={'Success'} clicked={this.orderHandler}>
            {' '}
            Order
          </Button>
        </form>
      </div>
    );
    if (this.state.loading) {
      formElements = <Spinner />;
    }
    return formElements;
  }
}

export default ContactData;
