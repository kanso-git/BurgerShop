import React, {Component, Fragment} from 'react';

import Burger from '../../components/Burger/Burger';
import BuilderControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../components/withErrorHandler/withErrorHandler";

const PRICE_INGREDIENTS = {
    salad: 0.7,
    bacon: 0.5,
    cheese: 0.5,
    meat: 1.5
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        showModal: false,
        loading: false,
        errorLoading:false
    };

    componentDidMount() {
        const  ingredientsPromise = axios.get('https://my-burger-cf562.firebaseio.com/ingredients.json');

        ingredientsPromise.then( res => {
                if(res.status !== 404){
                    this.setState(() => ({ingredients: res.data}));
                }else {
                    console.log('Error loading ingredients ...');
                    this.setState(() => ({errorLoading: true}));
                }
            }).catch(e => {
                console.log('Error loading ingredients ...');
                this.setState(() => ({errorLoading: true}));
            });

    }

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

    pruchaseOrderHandler = () => {
        //alert('purchase order ...');
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.price,
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
        this.setState(() => ({loading: true}));
        axios.post('/orders.json', order)
            .then(response => {
                if(response.status !== 404){
                    this.setState((prevState) => ({
                        loading: false,
                        showModal: !prevState.showModal
                    }));
                }else {
                    this.setState((prevState) => ({
                        loading: false,
                        showModal: !prevState.showModal
                    }))
                }
            })
            .catch(e => {
                this.setState((prevState) => ({
                    loading: false,
                    showModal: !prevState.showModal
                }))
            });
    };

    render() {
        let orderSummary = (<OrderSummary
            state={this.state}
            cancelOrder={this.showOrderSummaryHandler}
            purchaseOrder={this.pruchaseOrderHandler}
        />);
        let burger = (
            <Fragment>
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

        if (!this.state.ingredients) {
            orderSummary = <Spinner/>;
            burger = <Spinner/>;
        }else if (this.state.loading ){
            orderSummary = <Spinner/>;
        }

        if(this.state.errorLoading){
            burger=<p>Error while loading the ingredients ...</p>;
        }

        return (
            <Fragment>
                <Modal
                    show={this.state.showModal}
                    hideBackdrop={this.showOrderSummaryHandler}
                >{orderSummary}
                </Modal>
                {burger}
            </Fragment>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);
