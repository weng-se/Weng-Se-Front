import {
    REQUEST_FETCH_USERS,
    REQUEST_SUCCESS_USERS,
    REQUEST_FAILURE_USERS,
    REQUEST_CREATE_USER,
    REQUEST_SUCCESS_CREATE_USER,
    REQUEST_FAILURE_CREATE_USER,
} from "../actions/Users";

const INIT_STATE = {
    users: null,
    progress: 0,
    error: null
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        
        case REQUEST_FETCH_USERS: {
            return {
                ...state,
                progress: 0
            }
        }
        case REQUEST_SUCCESS_USERS: {
            return {
                ...state,
                error: null,
                progress: 100,
                users: action.payload
            }
        }
        case REQUEST_FAILURE_USERS: {
            return {
                ...state,
                progress: 100,
                error: action.error,
                users: action.payload
            }
        }


        case REQUEST_CREATE_USER: {
            return {
                ...state,
                progress: 0
            }
        }
        case REQUEST_SUCCESS_CREATE_USER: {
            return {
                ...state,
                error: null,
                progress: 100,
                users: action.payload
            }
        }
        case REQUEST_FAILURE_CREATE_USER: {
            return {
                ...state,
                progress: 100,
                error: action.error,
                users: action.payload
            }
        }

        default:
            return state;
    }
}