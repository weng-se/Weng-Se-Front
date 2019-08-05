import {
    REQUEST_CREATE_BANK,
    REQUEST_CREATE_BANK_SUCCESS,
    REQUEST_CREATE_BANK_FAILURE,
    REQUEST_CREATE_BANK_PROGRESS,

    REQUEST_FETCH_BANK,
    REQUEST_FETCH_BANK_SUCCESS,
    REQUEST_FETCH_BANK_FAILURE,
    REQUEST_FETCH_BANK_PROGRESS
    
} from '../constants/ActionTypes';


/**
 * ==================  (FETCH CHECKS) ==================
 */

export const fetchBanksRequest = () => {
    return {
        type: REQUEST_FETCH_BANK,
        progress: 0
    };
};
export const fetchBankSuccess = (payload) => {
    return {
        type: REQUEST_FETCH_BANK_SUCCESS,
        payload: payload,
        progress: 100
    };
};
export const fetchBankError = (error) => {
    return {
        type: REQUEST_FETCH_BANK_FAILURE,
        error: true,
        progress: 100
    }
};
export const fetchBankProgress = () => {
    return {
        type: REQUEST_FETCH_BANK_PROGRESS,
        progress: 0
    }
};


/**
 * ==================  (CREATE CHECK) ==================
 */

export const createBankRequest = (formData) => {
    return {
        type: REQUEST_CREATE_BANK,
        formData: formData,
        progress: 0
    };
};
export const createBankSuccess = (payload) => {
    return {
        type: REQUEST_CREATE_BANK_SUCCESS,
        payload: payload,
        progress: 100
    };
};
export const createBankError = (error) => {
    return {
        type: REQUEST_CREATE_BANK_FAILURE,
        error: true,
        progress: 100
    }
};
export const createBankProgress = () => {
    return {
        type: REQUEST_CREATE_BANK_PROGRESS,
        progress: 0
    }
};