import React from 'react';
import classes from './BuildControls.css';
import {ingredient as ing} from '../../../constants/ingredients';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: ing.SALAD},
    {label: 'Cheese', type: ing.CHEESE},
    {label: 'Meat', type: ing.MEAT}
];

const buildControls = props => (
    <div className={classes.BuildControls}>
        <p>
            Current Price: <strong> {props.totalPrice.toFixed(2)}</strong>
        </p>
        {controls.map(c => (
            <BuildControl {...props} key={c.label} type={c.type} label={c.label}/>
        ))}
        <button
            className={classes.OrderButton}
            disabled={props.purchaseable === false}
            onClick={props.showOrderSummary}
        >
            Order NOW
        </button>
    </div>
);

export default buildControls;
