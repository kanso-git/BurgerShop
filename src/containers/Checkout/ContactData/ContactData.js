import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: {
      name: 'bou me3za',
      street: 'malek el me3za',
      zipCode: '3434',
      country: 'zuetres',
      email: 'ma3eeyha@meza.sh',
      deliveryMethod: 'mde'
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice
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
          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            inputype={'input'}
          />
          <Input
            type="email"
            name="email"
            placeholder="Your Email"
            inputype={'input'}
          />
          <Input
            type="text"
            name="street"
            placeholder="Your Street"
            inputype={'input'}
          />
          <Input
            type="text"
            name="postal"
            placeholder="your Postal"
            inputype={'input'}
          />

          <Button btnType={'Success'} clicked={this.orderHandler}>
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
