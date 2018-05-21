import React, {Fragment} from 'react';
import Button from '../../UI/Button/Button';

const buildOrderSummary = props => {

    return Object.keys(props.state.ingredients).map((key, i) => (
        <li key={key + i}>
            <span style={{textTransform: 'uppercase'}}>{key}</span> : {props.state.ingredients[key]}
        </li>
    ));
};
const orderSummary = props => (
    <Fragment>
        <h3> Your Order Summary </h3>
        <p>Your delicious Burger has the following ingredients:</p>
        <ul>{buildOrderSummary(props)}</ul>
        <p style={{textAlign: 'right'}}>
            <strong>Price: {props.state.totalPrice.toFixed(2)}</strong>
        </p>
        <p> Continue your purchase ?</p>
        <Button btnType={'Danger'} clicked={props.cancelOrder}>
            Cancel
        </Button>
        <Button btnType={'Success'} clicked={props.purchaseOrder}>
            Continue
        </Button>
    </Fragment>
);

export default orderSummary;
