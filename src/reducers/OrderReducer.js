import * as types from '../actions/Types'

const initialState = {
    list: [],
    error: null
}

const orderReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.ERROR_LOADING_LIST_ORDERS:
            return {...state, error: action.payload}

        case types.LIST_ORDERS:
            return {...state, list: action.payload, error: null}

        case types.ERROR_PLACING_ORDER:
            return {...state, error: action.payload}

        case types.PLACE_ORDER:
            return {...state, list: [...state.list, action.payload], error: null}

        default:
            return state;
    }
}

export default orderReducer;