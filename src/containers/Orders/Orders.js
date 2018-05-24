import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../components/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: []
  };
  componentDidMount() {
    console.log('>>>>>>>>>>>>> Orders Component >>>>>>>>>>>>>>>>>>>><');
    const orders = axios.get('/orders.json');
    orders
      .then(res => {
        if (res.status === 200) {
          const orders = Object.keys(res.data).map(o => (
            <Order key={o} {...res.data[o]} />
          ));
          this.setState(() => ({ orders }));
        } else {
          console.error('error while loading the orders ');
        }
      })
      .catch(e =>
        console.error('error while loading the orders e:' + e.message)
      );
  }
  render() {
    return <div>{this.state.orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
