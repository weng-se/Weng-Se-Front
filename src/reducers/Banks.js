import {
    
    REQUEST_CREATE_BANK,
    REQUEST_CREATE_BANK_SUCCESS,
    REQUEST_CREATE_BANK_FAILURE,

    REQUEST_FETCH_BANK,
    REQUEST_FETCH_BANK_SUCCESS,
    REQUEST_FETCH_BANK_FAILURE,
   
} from "../constants/ActionTypes";

const INIT_STATE = {
    banks: null,
    progress: 0,
    bank: null,
    error: false,
    deleted: false,
    created: false,
    updated: false
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        
        case REQUEST_CREATE_BANK: {
            return {
                ...state,
                progress: 0
            }
        }
        case REQUEST_CREATE_BANK_SUCCESS: {
            return {
                ...state,
                created: true,
                progress: 100,
                bank: action.payload
            }
        }
        case REQUEST_CREATE_BANK_FAILURE: {
            return {
                ...state,
                progress: 100,
                error: true
            }
        }


        case REQUEST_FETCH_BANK: {
            return {
                ...state,
                progress: 0
            }
        }
        case REQUEST_FETCH_BANK_SUCCESS: {
            return {
                ...state,
                progress: 100,
                banks: action.payload
            }
        }
        case REQUEST_FETCH_BANK_FAILURE: {
            return {
                ...state,
                progress: 100,
                error: true
            }
        }

        default:
            return state;
    }
}