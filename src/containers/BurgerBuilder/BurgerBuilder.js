import React, {Component, Fragment} from 'react';

import Burger from '../../components/Burger/Burger';
import BuilderControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const PRICE_INGREDIENTS = {
    salad: 0.7,
    bacon: 0.5,
    cheese: 0.5,
    meat: 1.5
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false,
        showModal: false
    };

    checkPurchaseable = ingredients => {
        let isPurchaseable = false;
        for (let key in ingredients) {
            if (ingredients[key] > 0) {
                isPurchaseable = true;
            }
        }
        this.setState(() => ({
            purchaseable: isPurchaseable
        }));
    };
    addIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = newCount;
        this.setState(prevState => ({
            ingredients: {...prevState.ingredients, ...updatedIngredient},
            totalPrice: prevState.totalPrice + PRICE_INGREDIENTS[type]
        }));
        this.checkPurchaseable(updatedIngredient);
    };

    lessIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount - 1;
        if (newCount >= 0) {
            const updatedIngredient = {
                ...this.state.ingredients
            };
            updatedIngredient[type] = newCount;
            this.setState(prevState => ({
                ingredients: {...prevState.ingredients, ...updatedIngredient},
                totalPrice: prevState.totalPrice - PRICE_INGREDIENTS[type]
            }));
            this.checkPurchaseable(updatedIngredient);
        }
    };
    showOrderSummaryHandler = () => {
        this.setState(prevState => ({
            showModal: !prevState.showModal
        }));
    };

    render() {
        return (
            <Fragment>
                <Modal
                    show={this.state.showModal}
                    hideBackdrop={this.showOrderSummaryHandler}
                >
                    <OrderSummary
                        state={this.state}
                        cancelOrder={this.showOrderSummaryHandler}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuilderControls
                    addIngredient={this.addIngredientHandler}
                    lessIngredient={this.lessIngredientHandler}
                    ingredients={this.state.ingredients}
                    totalPrice={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    showOrderSummary={this.showOrderSummaryHandler}
                />
            </Fragment>
        );
    }
}

export default BurgerBuilder;
