import {
    REQUEST_FETCH_CHECKS,
    REQUEST_FETCH_CHECKS_SUCCESS,
    REQUEST_FETCH_CHECKS_FAILURE,
    REQUEST_FETCH_CHECKS_PROGRESS,

    REQUEST_DELETE_CHECK,
    REQUEST_DELETE_CHECK_SUCCESS,
    REQUEST_DELETE_CHECK_FAILURE,
    REQUEST_DELETE_CHECK_PROGRESS,

    REQUEST_CREATE_CHECK,
    REQUEST_CREATE_CHECK_SUCCESS,
    REQUEST_CREATE_CHECK_FAILURE,
    REQUEST_CREATE_CHECK_PROGRESS,
    REQUEST_CREATE_CHECK_OTHER_SUCCESS,
    
    REQUEST_GET_CHECK,
    REQUEST_GET_CHECK_SUCCESS,
    REQUEST_GET_CHECK_FAILURE,
    REQUEST_GET_CHECK_PROGRESS,
    
    REQUEST_EDIT_CHECK,
    REQUEST_EDIT_CHECK_SUCCESS,
    REQUEST_EDIT_CHECK_FAILURE,
} from '../constants/ActionTypes'


/**
 * ==================  (GET CHECKS) ==================
 */

export const fetchChecksRequest = () => {
    return {
        type: REQUEST_FETCH_CHECKS,
        progress: 0
    };
};
export const fetchChecksSuccess = (payload) => {
    return {
        type: REQUEST_FETCH_CHECKS_SUCCESS,
        payload: payload,
        error: false,
        progress: 100
    };
};
export const fetchChecksError = (error) => {
    return {
        type: REQUEST_FETCH_CHECKS_FAILURE,
        error: true,
        progress: 100
    }
};
export const fetchChecksProgress = () => {
    return {
        type: REQUEST_FETCH_CHECKS_PROGRESS,
        progress: 0
    };
};
/**
 * ==================  (DELETE CHECKS) ==================
 */
export const deleteCheckRequest = (id) => {
    return {
        type: REQUEST_DELETE_CHECK,
        progress: 0
    };
};
export const deleteCheckSuccess = (payload) => {
    return {
        type: REQUEST_DELETE_CHECK_SUCCESS,
        payload: payload,
        deleted : true,
        progress: 100
    };
};
export const deleteCheckError = (error) => {
    return {
        type: REQUEST_DELETE_CHECK_FAILURE,
        error: true,
        deleted : false,
        progress: 100
    }
};
export const deleteCheckProgress = () => {
    return {
        type: REQUEST_DELETE_CHECK_PROGRESS,
        progress: 0
    };
};

/**
 * ==================  (CREATE CHECKS) ==================
 */
export const createCheckRequest = (formData, bool) => {
    return {
        type: REQUEST_CREATE_CHECK,
        formData: formData,
        bool: bool,
        progress: 0
    };
};
export const createCheckSuccess = (payload) => {
    return {
        type: REQUEST_CREATE_CHECK_SUCCESS,
        payload: payload,
        created : true,
        progress: 100
    };
};
export const createOtherCheckSuccess = (payload) => {
    return {
        type: REQUEST_CREATE_CHECK_OTHER_SUCCESS,
        payload: payload,
        created : true,
        other : true,
        progress: 100
    };
};

export const createCheckError = (error) => {
    return {
        type: REQUEST_CREATE_CHECK_FAILURE,
        error: true,
        progress: 100
    }
};
export const createCheckProgress = () => {
    return {
        type: REQUEST_CREATE_CHECK_PROGRESS,
        progress: 0
    };
};




/**
 * ==================  (GET CHECK) ==================
 */
export const getCheckRequest = (id) => {
    return {
        type: REQUEST_GET_CHECK,
        id: id,
        progress: 0
    };
};
export const getCheckSuccess = (payload) => {
    return {
        type: REQUEST_GET_CHECK_SUCCESS,
        payload: payload,
        deleted : true,
        progress: 100
    };
};
export const getCheckError = (error) => {
    return {
        type: REQUEST_GET_CHECK_FAILURE,
        error: true,
        deleted : false,
        progress: 100
    }
};
export const getCheckProgress = () => {
    return {
        type: REQUEST_GET_CHECK_PROGRESS,
        progress: 0
    };
};

/**
 * ==================  (UPDATE CHECKS) ==================
 */

export const checkEditRequest = (formData) => {
    return {
        type: REQUEST_EDIT_CHECK,
        formData: formData,
        progress: 0
    }
}

export const checkEditSuccess = (payload) => {
    return {
        type: REQUEST_EDIT_CHECK_SUCCESS,
        payload: payload,
        updated: true,
        progress: 100
    }
}
export const checkEditError = (error) => {
    return {
        type: REQUEST_EDIT_CHECK_FAILURE,
        error: true,
        progress: 100
    }
}