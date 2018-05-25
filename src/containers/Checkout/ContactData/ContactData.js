import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        changed: e => this.onChangeHandler(e, 'name'),
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street'
        },
        changed: e => this.onChangeHandler(e, 'street'),
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Postal Code'
        },
        changed: e => this.onChangeHandler(e, 'zipCode'),
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        },
        changed: e => this.onChangeHandler(e, 'country'),
        value: 'Switzerland'
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Email'
        },
        changed: e => this.onChangeHandler(e, 'email'),
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'f', displayValue: 'Fast' },
            { value: 'c', displayValue: 'Cheap' }
          ]
        },
        changed: e => this.onChangeHandler(e, 'deliveryMethod'),
        value: 'f'
      }
    },
    loading: false
  };

  onChangeHandler = (e, key) => {
    const updatedOrderForm = { ...this.state.orderForm };
    updatedOrderForm[key].value = e.target.value;
    this.setState(() => ({ orderForm: updatedOrderForm }));
  };

  orderHandler = event => {
    event.preventDefault();
    const formData = {};
    for (let el in this.state.orderForm) {
      formData[el] = this.state.orderForm[el].value;
    }

    const order = {
      customer: { ...formData },
      ingredients: this.props.ingredients,
      price: this.props.totalPrice
    };

    console.log(`the order before send save in DB:
     ${JSON.stringify(order, null, 3)}`);

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
    const formElementsArray = [];

    for (let el in this.state.orderForm) {
      const elemObj = this.state.orderForm[el];
      formElementsArray.push(<Input key={el} {...elemObj} />);
    }
    let formElements = (
      <div className={classes.ContcatData}>
        <h4>Enter your contact data</h4>
        <form onSubmit={this.orderHandler}>
          {formElementsArray}

          <Button btnType={'Success'}>Order</Button>
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
