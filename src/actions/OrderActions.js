import axios from '../axios-orders';
import * as types from './Types';

// actions generators
const listOrderAction = (payload)=>({
    type: types.LIST_ORDERS,
    payload
})

const errorLoadingListOrderAction =(payload)=>({
    type: types.ERROR_LOADING_LIST_ORDERS,
    payload
})

const placeOrderAction =(payload)=>({
    type: types.PLACE_ORDER,
    payload
})

const errorPlaceOrderAction =(payload)=>({
    type: types.ERROR_PLACING_ORDER,
    payload
})

// axios
const loadOrdersAxios = async()=> {
    return axios.get('/orders.json');
}

const placeOrdersAxios = async(orderData) =>{
    return axios.post('/orders.json', orderData);
}

// actions
const loadOrdersList = () =>
    async (dispatch, getState) => {

        try {
            const orders = await loadOrdersAxios();
            const  ordersAction = listOrderAction(orders.data);
            dispatch(ordersAction);
        } catch (e) {
            dispatch(errorLoadingListOrderAction('error loading the orders'));

        }
    };

const placeOrder = (orderData )=>
    async(dispatch, getState) =>{
      try{
          debugger;
          const order = await placeOrdersAxios(orderData);
          debugger;
      }catch(e){
          dispatch(errorPlaceOrderAction('error placing order'));
      }
    }
export {
    loadOrdersList,
    placeOrder,
};
