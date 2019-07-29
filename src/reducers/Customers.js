import {
    REQUEST_FETCH_CUSTOMERS,
    REQUEST_FETCH_CUSTOMERS_SUCCESS,
    REQUEST_FETCH_CUSTOMERS_FAILURE,

    REQUEST_CREATE_CUSTOMER,
    REQUEST_CREATE_CUSTOMER_SUCCESS,
    REQUEST_CREATE_CUSTOMER_FAILURE,

    REQUEST_DELETE_CUSTOMER,
    REQUEST_DELETE_CUSTOMER_SUCCESS,
    REQUEST_DELETE_CUSTOMER_FAILURE,

    REQUEST_EDIT_CUSTOMER,
    REQUEST_EDIT_CUSTOMER_SUCCESS,
    REQUEST_EDIT_CUSTOMER_FAILURE,

    REQUEST_GET_CUSTOMER,
    REQUEST_GET_CUSTOMER_SUCCESS,
    REQUEST_GET_CUSTOMER_FAILURE
} from "../constants/ActionTypes";

const INIT_STATE = {
    customers: null,
    progress: 0,
    error: null,
    customer: null
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        
        case REQUEST_FETCH_CUSTOMERS: {
            return {
                ...state,
                progress: 0
            }
        }
        case REQUEST_FETCH_CUSTOMERS_SUCCESS: {
            return {
                ...state,
                error: null,
                progress: 100,
                customers: action.payload
            }
        }
        case REQUEST_FETCH_CUSTOMERS_FAILURE: {
            return {
                ...state,
                progress: 100,
                error: action.error,
                customers: action.payload
            }
        }


        case REQUEST_CREATE_CUSTOMER: {
            return {
                ...state,
                progress: 0
            }
        }
        case REQUEST_CREATE_CUSTOMER_SUCCESS: {
            return {
                ...state,
                error: null,
                progress: 100,
                customers: action.payload
            }
        }
        case REQUEST_CREATE_CUSTOMER_FAILURE: {
            return {
                ...state,
                progress: 100,
                error: action.error,
                customers: action.payload
            }
        }



        case REQUEST_DELETE_CUSTOMER: {
            return {
                ...state,
                progress: 0
            }
        }
        case REQUEST_DELETE_CUSTOMER_SUCCESS: {
            return {
                ...state,
                error: null,
                progress: 100,
                customers: action.payload
            }
        }
        case REQUEST_DELETE_CUSTOMER_FAILURE: {
            return {
                ...state,
                progress: 100,
                error: action.error,
                customers: action.payload
            }
        }


        case REQUEST_EDIT_CUSTOMER: {
            return {
                ...state,
                error: false,
            }
        }
        case REQUEST_EDIT_CUSTOMER_SUCCESS: {
            return {
                ...state,
                error: false,
                customer: action.payload
            }
        }
        case REQUEST_EDIT_CUSTOMER_FAILURE: {
            return {
                ...state,
                error: true,
            }
        }



        case REQUEST_GET_CUSTOMER: {
            return {
                ...state,
                progress: 0
            }
        }
        case REQUEST_GET_CUSTOMER_SUCCESS: {
            return {
                ...state,
                progress: 100,
                customer: action.payload
            }
        }
        case REQUEST_GET_CUSTOMER_FAILURE: {
            return {
                ...state,
                progress: 100,
                error: true,
            }
        }

        default:
            return state;
    }
}