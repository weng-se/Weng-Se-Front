import {
    REQUEST_FETCH_SUPPLIERS,
    REQUEST_FETCH_SUPPLIERS_SUCCESS,
    REQUEST_FETCH_SUPPLIERS_FAILURE,

    REQUEST_CREATE_SUPPLIER,
    REQUEST_CREATE_SUPPLIER_FAILURE,
    REQUEST_CREATE_SUPPLIER_SUCCESS,

    REQUEST_DELETE_SUPPLIER,
    REQUEST_DELETE_SUPPLIER_FAILURE,
    REQUEST_DELETE_SUPPLIER_SUCCESS,

    REQUEST_GET_SUPPLIER,
    REQUEST_GET_SUPPLIER_SUCCESS,
    REQUEST_GET_SUPPLIER_FAILURE,

    REQUEST_EDIT_SUPPLIER,
    REQUEST_EDIT_SUPPLIER_SUCCESS,
    REQUEST_EDIT_SUPPLIER_FAILURE

} from "../constants/ActionTypes";

const INIT_STATE = {
    suppliers: null,
    progress: 0,
    error: null,
    supplier: null,
    deleted: false,
    created: false,
    updated: false
};


export default (state = INIT_STATE, action) => {
    
    switch (action.type) {
        
        case REQUEST_FETCH_SUPPLIERS: {
            return {
                ...state,
                progress: 0
            }
        }
        case REQUEST_FETCH_SUPPLIERS_SUCCESS: {
            return {
                ...state,
                error: null,
                progress: 100,
                suppliers: action.payload,
                
            }
        }
        case REQUEST_FETCH_SUPPLIERS_FAILURE: {
            return {
                ...state,
                progress: 100,
                error: action.error,
                
            }
        }

        case REQUEST_CREATE_SUPPLIER: {
            return {
                ...state,
                progress: 0
            }
        }
        case REQUEST_CREATE_SUPPLIER_SUCCESS: {
            return {
                ...state,
                error: null,
                progress: 100,
                supplier: action.payload,
                created: true
                
            }
        }
        case REQUEST_CREATE_SUPPLIER_FAILURE: {
            return {
                ...state,
                progress: 400,
                error: true,
                
            }
        }

        case REQUEST_DELETE_SUPPLIER: {
            return {
                ...state,
                progress: 0
            }
        }
        case REQUEST_DELETE_SUPPLIER_SUCCESS: {
            return {
                ...state,
                error: null,
                progress: 100,
                supplier: action.payload,
                deleted: true
                
            }
        }
        case REQUEST_DELETE_SUPPLIER_FAILURE: {
            return {
                ...state,
                progress: 400,
                error: true,
                
            }
        }

        
        case REQUEST_GET_SUPPLIER: {
            return {
                ...state,
                progress: 0
            }
        }
        case REQUEST_GET_SUPPLIER_SUCCESS: {
            return {
                ...state,
                error: null,
                progress: 100,
                supplier: action.payload,
                deleted: true
                
            }
        }
        case REQUEST_GET_SUPPLIER_FAILURE: {
            return {
                ...state,
                progress: 400,
                error: true,
                
            }
        }

        case REQUEST_EDIT_SUPPLIER: {
            return {
                ...state,
                progress: 0
            }
        }
        case REQUEST_EDIT_SUPPLIER_SUCCESS: {
            return {
                ...state,
                error: null,
                progress: 100,
                supplier: action.payload,
                updated: true
                
            }
        }
        case REQUEST_EDIT_SUPPLIER_FAILURE: {
            return {
                ...state,
                progress: 400,
                error: true,
                
            }
        }


        
        default:
            return state;
    }
}