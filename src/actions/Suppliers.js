import {
    REQUEST_FETCH_SUPPLIERS,
    REQUEST_FETCH_SUPPLIERS_SUCCESS,
    REQUEST_FETCH_SUPPLIERS_FAILURE,
    REQUEST_FETCH_SUPPLIERS_PROGRESS,

    REQUEST_CREATE_SUPPLIER,
    REQUEST_CREATE_SUPPLIER_SUCCESS,
    REQUEST_CREATE_SUPPLIER_FAILURE,
    REQUEST_CREATE_SUPPLIER_PROGRESS,

    REQUEST_DELETE_SUPPLIER,
    REQUEST_DELETE_SUPPLIER_PROGRESS,
    REQUEST_DELETE_SUPPLIER_FAILURE,
    REQUEST_DELETE_SUPPLIER_SUCCESS,

    REQUEST_GET_SUPPLIER,
    REQUEST_GET_SUPPLIER_SUCCESS,
    REQUEST_GET_SUPPLIER_FAILURE,

    REQUEST_EDIT_SUPPLIER_PROGRESS,
    REQUEST_EDIT_SUPPLIER,
    REQUEST_EDIT_SUPPLIER_SUCCESS,
    REQUEST_EDIT_SUPPLIER_FAILURE
} from '../constants/ActionTypes';




/**
 * ==================  (GET SUPPLIERS) ==================
 */
export const fetchSuppliersRequest = () => {
    
    return {
        type: REQUEST_FETCH_SUPPLIERS,
        progress: 0
    };
};
export const fetchSuppliersProgress = () => {
    
    return {
        type: REQUEST_FETCH_SUPPLIERS_PROGRESS,
        progress: 0
    };
};

export const fetchSuppliersSuccess = (payload) => {
    
    return {
        type: REQUEST_FETCH_SUPPLIERS_SUCCESS,
        progress: 0,
        payload: payload
    };
};

export const fetchSuppliersError = (error) => {
   
    return {
        type: REQUEST_FETCH_SUPPLIERS_FAILURE,
        progress: 0,
        error: error
    };
};


/**
 * ===================ADD SUPPLIER============
 */

export const createSupplierRequest = (payload) => {
    
    return {
        type: REQUEST_CREATE_SUPPLIER,
        progress: 0,
        payload: payload
    };
};

export const createSupplierSuccess = (payload) => {
    
    return {
        type: REQUEST_CREATE_SUPPLIER_SUCCESS,
        progress: 200,
        payload: payload
    };
};

export const createSupplierFailure = (payload) => {
    
    return {
        type: REQUEST_CREATE_SUPPLIER_FAILURE,
        progress: 400,
        
    };
};

export const createSupplierProgress = (payload) => {
    
    return {
        type: REQUEST_CREATE_SUPPLIER_PROGRESS,
        progress: 100,
       
    };
};


/**
 * ===================DELETE SUPPLIER============
 */

export const deleteSupplierRequest = (payload) => {
   
    return {
        type: REQUEST_DELETE_SUPPLIER,
        progress: 0,
        id: payload
    };
};

export const deleteSupplierSuccess = (payload) => {
    
    return {
        type: REQUEST_DELETE_SUPPLIER_SUCCESS,
        progress: 200,
        payload: payload
    };
};

export const deleteSupplierFailure = () => {
    
    return {
        type: REQUEST_DELETE_SUPPLIER_FAILURE,
        progress: 400,
        
    };
};

export const deleteSupplierProgress = (payload) => {
    
    return {
        type: REQUEST_DELETE_SUPPLIER_PROGRESS,
        progress: 100,
       
    };
};


/**
 * ===================GET SUPPLIER============
 */

export const getSupplierRequest = (payload) => {
   
    return {
        type: REQUEST_GET_SUPPLIER,
        progress: 0,
        id: payload
    };
};

export const getSupplierSuccess = (payload) => {
    
    return {
        type: REQUEST_GET_SUPPLIER_SUCCESS,
        progress: 200,
        payload: payload
    };
};

export const getSupplierFailure = () => {
    
    return {
        type: REQUEST_GET_SUPPLIER_FAILURE,
        progress: 400,
        
    };
};

/**
 * ===================EDIT SUPPLIER============
 */

export const editSupplierRequest = (formData) => {
    
    return {
        type: REQUEST_EDIT_SUPPLIER,
        progress: 0,
        formData: formData
    };
};

export const editSupplierSuccess = (payload) => {
    
    return {
        type: REQUEST_EDIT_SUPPLIER_SUCCESS,
        progress: 200,
        payload: payload
    };
};

export const editSupplierFailure = () => {
    
    return {
        type: REQUEST_EDIT_SUPPLIER_FAILURE,
        progress: 400,
        
    };
};

export const editSupplierProgress = () => {
    
    return {
        type: REQUEST_EDIT_SUPPLIER_PROGRESS,
        progress: 100,
       
    };
};







