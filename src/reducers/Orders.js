import {
   IMPORT_ORDER_REQUEST,
   IMPORT_ORDER_SUCCESS,
   IMPORT_ORDER_FAILURE
} from "../actions/Orders";

const INIT_STATE = {
    orders: null,
    progress: 0,
    error: null
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case IMPORT_ORDER_REQUEST: {
            return {
                ...state,
                progress: 0
            }
        }
        case IMPORT_ORDER_SUCCESS: {
            return {
                ...state,
                error: null,
                progress: 100,
                orders: action.payload
            }
        }
        case IMPORT_ORDER_FAILURE: {
            return {
                ...state,
                progress: 100,
                error: action.error,
                orders: action.payload
            }
        }
        default:
            return state;
    }
}
