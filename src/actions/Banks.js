import {
    REQUEST_CREATE_BANK,
    REQUEST_CREATE_BANK_SUCCESS,
    REQUEST_CREATE_BANK_FAILURE,
    REQUEST_CREATE_BANK_PROGRESS
} from '../constants/ActionTypes';


/**
 * ==================  (GET CHECKS) ==================
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