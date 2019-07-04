import {
    REQUEST_FETCH_USERS,
    REQUEST_FETCH_USERS_SUCCESS,
    REQUEST_FETCH_USERS_FAILURE,

    REQUEST_CREATE_USER,
    REQUEST_CREATE_USER_SUCCESS,
    REQUEST_CREATE_USER_FAILURE,

    REQUEST_DELETE_USER,
    REQUEST_DELETE_USER_SUCCESS,
    REQUEST_DELETE_USER_FAILURE,

    REQUEST_EDIT_USER,
    REQUEST_EDIT_USER_SUCCESS,
    REQUEST_EDIT_USER_FAILURE,

    REQUEST_GET_USER,
    REQUEST_GET_USER_SUCCESS,
    REQUEST_GET_USER_FAILURE
} from "../constants/ActionTypes";

const INIT_STATE = {
    users: null,
    progress: 0,
    error: null,
    user: null
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        
        case REQUEST_FETCH_USERS: {
            return {
                ...state,
                progress: 0
            }
        }
        case REQUEST_FETCH_USERS_SUCCESS: {
            return {
                ...state,
                error: null,
                progress: 100,
                users: action.payload
            }
        }
        case REQUEST_FETCH_USERS_FAILURE: {
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
        case REQUEST_CREATE_USER_SUCCESS: {
            return {
                ...state,
                error: null,
                progress: 100,
                users: action.payload
            }
        }
        case REQUEST_CREATE_USER_FAILURE: {
            return {
                ...state,
                progress: 100,
                error: action.error,
                users: action.payload
            }
        }



        case REQUEST_DELETE_USER: {
            return {
                ...state,
                progress: 0
            }
        }
        case REQUEST_DELETE_USER_SUCCESS: {
            return {
                ...state,
                error: null,
                progress: 100,
                users: action.payload
            }
        }
        case REQUEST_DELETE_USER_FAILURE: {
            return {
                ...state,
                progress: 100,
                error: action.error,
                users: action.payload
            }
        }


        case REQUEST_EDIT_USER: {
            return {
                ...state,
                error: false,
            }
        }
        case REQUEST_EDIT_USER_FAILURE: {
            return {
                ...state,
                error: true,
            }
        }
        case REQUEST_EDIT_USER_SUCCESS: {
            return {
                ...state,
                error: false,
                user: action.payload
            }
        }



        case REQUEST_GET_USER: {
            return {
                ...state,
                progress: 0
            }
        }
        case REQUEST_GET_USER_SUCCESS: {
            return {
                ...state,
                progress: 100,
                user: action.payload
            }
        }
        case REQUEST_GET_USER_FAILURE: {
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