import {
    REQUEST_FETCH_CHECKS,
    REQUEST_FETCH_CHECKS_SUCCESS,
    REQUEST_FETCH_CHECKS_FAILURE,
    
    REQUEST_DELETE_CHECK,
    REQUEST_DELETE_CHECK_FAILURE,
    REQUEST_DELETE_CHECK_SUCCESS,
    
    REQUEST_CREATE_CHECK,
    REQUEST_CREATE_CHECK_SUCCESS,
    REQUEST_CREATE_CHECK_FAILURE,

    REQUEST_GET_CHECK,
    REQUEST_GET_CHECK_SUCCESS,
    REQUEST_GET_CHECK_FAILURE,

    REQUEST_EDIT_CHECK,
    REQUEST_EDIT_CHECK_SUCCESS,
    REQUEST_EDIT_CHECK_FAILURE,
} from "../constants/ActionTypes";

const INIT_STATE = {
    checks: null,
    progress: 0,
    error: false,
    deleted: false,
    created: false,
    updated: false
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        
        case REQUEST_FETCH_CHECKS: {
            return {
                ...state,
                progress: 0
            }
        }
        case REQUEST_FETCH_CHECKS_SUCCESS: {
            return {
                ...state,
                error: false,
                progress: 100,
                checks: action.payload
            }
        }
        case REQUEST_FETCH_CHECKS_FAILURE: {
            return {
                ...state,
                progress: 100,
                error: true,
                checks: action.payload
            }
        }



        case REQUEST_DELETE_CHECK: {
            return {
                ...state,
                progress: 0
            }
        }
        case REQUEST_DELETE_CHECK_SUCCESS: {
            return {
                ...state,
                progress: 100,
                deleted: true,
                check: action.payload
            }
        }
        case REQUEST_DELETE_CHECK_FAILURE: {
            return {
                ...state,
                progress: 100,
                check: action.payload
            }
        }




        case REQUEST_CREATE_CHECK: {
            return {
                ...state,
                progress: 0
            }
        }
        case REQUEST_CREATE_CHECK_SUCCESS: {
            return {
                ...state,
                progress: 100,
                created: true,
                check: action.payload
            }
        }
        case REQUEST_CREATE_CHECK_FAILURE: {
            return {
                ...state,
                progress: 100,
                check: action.payload
            }
        }



        case REQUEST_GET_CHECK: {
            return {
                ...state,
                progress: 0
            }
        }
        case REQUEST_GET_CHECK_SUCCESS: {
            return {
                ...state,
                progress: 100,
                check: action.payload
            }
        }
        case REQUEST_GET_CHECK_FAILURE: {
            return {
                ...state,
                progress: 100,
                error: true
            }
        }





        case REQUEST_EDIT_CHECK: {
            return {
                ...state,
                progress: 100
            }
        }
        case REQUEST_EDIT_CHECK_SUCCESS: {
            return {
                ...state,
                progress: 100,
                updated: true,
                check: action.payload
            }
        }
        case REQUEST_EDIT_CHECK_FAILURE: {
            return {
                ...state,
                progress: 0,
                error: true
            }
        }


        default:
            return state;
    }
}