import {
    REQUEST_FETCH_CUSTOMERS,
    REQUEST_FETCH_CUSTOMERS_SUCCESS,
    REQUEST_FETCH_CUSTOMERS_FAILURE,
    REQUEST_FETCH_CUSTOMERS_PROGRESS,

    REQUEST_CREATE_CUSTOMER,
    REQUEST_CREATE_CUSTOMER_SUCCESS,
    REQUEST_CREATE_CUSTOMER_FAILURE,
    REQUEST_CREATE_CUSTOMER_PROGRESS,

    REQUEST_DELETE_CUSTOMER,
    REQUEST_DELETE_CUSTOMER_SUCCESS,
    REQUEST_DELETE_CUSTOMER_FAILURE,
    REQUEST_DELETE_CUSTOMER_PROGRESS,

    REQUEST_EDIT_CUSTOMER,
    REQUEST_EDIT_CUSTOMER_SUCCESS,
    REQUEST_EDIT_CUSTOMER_FAILURE,
    REQUEST_EDIT_CUSTOMER_PROGRESS,

    REQUEST_GET_CUSTOMER,
    REQUEST_GET_CUSTOMER_SUCCESS,
    REQUEST_GET_CUSTOMER_FAILURE

} from '../constants/ActionTypes';


/**
 * ==================  (FETCH CUTOMERS) ==================
 */

export const fetchCustomersRequest = (users) => {
    return {
        type: REQUEST_FETCH_CUSTOMERS,
        payload: users,
        progress: 0
    };
};
export const fetchCustomersSuccess = (payload) => {
    return {
        type: REQUEST_FETCH_CUSTOMERS_SUCCESS,
        payload: payload,
        progress: 100
    };
};
export const fetchCustomersError = (error) => {
    return {
        type: REQUEST_FETCH_CUSTOMERS_FAILURE,
        error: error,
        progress: 100
    }
};
export const fetchCustomersProgress = () => {
    return {
        type: REQUEST_FETCH_CUSTOMERS_PROGRESS,
        progress: 0
    };
};

/**
 * ==================  (CREATE CUSTOMER) ==================
 */


export const createCustomerRequest = (formData) => {
    return {
        type: REQUEST_CREATE_CUSTOMER,
        formData: formData,
        progress: 0
    };
};
export const createCustomerSuccess = (payload) => {
    return {
        type: REQUEST_CREATE_CUSTOMER_SUCCESS,
        payload: payload,
        progress: 100
    };
};
export const createCustomerError = (error) => {
    return {
        type: REQUEST_CREATE_CUSTOMER_FAILURE,
        error: true,
        progress: 100
    }
};
export const createCustomerProgress = () => {
    return {
        type: REQUEST_CREATE_CUSTOMER_PROGRESS,
        progress: 0
    };
};


/**
 * ==================  (DELETE CUSTOMER) ==================
 */

export const deleteCustomerRequest = (user) => {
    return {
        type: REQUEST_DELETE_CUSTOMER,
        uid: user,
        progress: 0
    };
};
export const deleteCustomerSuccess = (payload) => {
    return {
        type: REQUEST_DELETE_CUSTOMER_SUCCESS,
        payload: payload,
        progress: 100
    };
};
export const deleteCustomerError = (error) => {
    return {
        type: REQUEST_DELETE_CUSTOMER_FAILURE,
        error: true,
        progress: 100
    }
};
export const deleteCustomerProgress = () => {
    return {
        type: REQUEST_DELETE_CUSTOMER_PROGRESS,
        progress: 0
    };
};

/**
 * ==================  (EDIT CUSTOMER) ==================
 */

export const editCustomerRequest = (formData) => {
    return {
        type: REQUEST_EDIT_CUSTOMER,
        formData: formData,
        progress: 0
    }
}

export const editCustomerSuccess = (payload) => {
    return {
        type: REQUEST_EDIT_CUSTOMER_SUCCESS,
        payload: payload,
        progress: 100
    }
}
export const editCustomerError = (error) => {
    return {
        type: REQUEST_EDIT_CUSTOMER_FAILURE,
        error: error,
        progress: 100
    }
}

export const editCustomerProgress = () => {
    return {
        type: REQUEST_EDIT_CUSTOMER_PROGRESS,
        progress: 0
    }
}


/**
 * ==================  (GET CUSTOMER) ==================
 */

export const getCustomerRequest = (customer) => {
    return {
        type: REQUEST_GET_CUSTOMER,
        customer: customer,
        progress: 0
    }
}

export const getcustomerSuccess = (payload) => {
    return {
        type: REQUEST_GET_CUSTOMER_SUCCESS,
        payload: payload,
        progress: 100
    }
}

export const getCustomerError = (error) => {
    return {
        type: REQUEST_GET_CUSTOMER_FAILURE,
        error: error,
        progress: 100
    }
}

