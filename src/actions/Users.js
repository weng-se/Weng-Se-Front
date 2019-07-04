import {
    REQUEST_FETCH_USERS,
    REQUEST_FETCH_USERS_SUCCESS,
    REQUEST_FETCH_USERS_FAILURE,
    REQUEST_FETCH_USERS_PROGRESS,

    REQUEST_CREATE_USER,
    REQUEST_CREATE_USER_SUCCESS,
    REQUEST_CREATE_USER_FAILURE,
    REQUEST_CREATE_USER_PROGRESS,

    REQUEST_DELETE_USER,
    REQUEST_DELETE_USER_SUCCESS,
    REQUEST_DELETE_USER_FAILURE,
    REQUEST_DELETE_USER_PROGRESS,

    REQUEST_EDIT_USER,
    REQUEST_EDIT_USER_SUCCESS,
    REQUEST_EDIT_USER_FAILURE,

    REQUEST_GET_USER,
    REQUEST_GET_USER_SUCCESS,
    REQUEST_GET_USER_FAILURE,
    
    REQUEST_STATUS_USER,
    REQUEST_STATUS_USER_SUCCESS,
    REQUEST_STATUS_USER_FAILURE,
    REQUEST_STATUS_USER_PROGRESS,

    REQUEST_IMPORT_USERS,
    REQUEST_IMPORT_USERS_PROGRESS,
    REQUEST_IMPORT_USERS_FAILURE,
    REQUEST_IMPORT_USERS_SUCCESS,
} from '../constants/ActionTypes'


/**
 * ==================  (GET USERS) ==================
 */

export const fetchUsersRequest = (users) => {
    return {
        type: REQUEST_FETCH_USERS,
        payload: users,
        progress: 0
    };
};
export const fetchUsersSuccess = (payload) => {
    return {
        type: REQUEST_FETCH_USERS_SUCCESS,
        payload: payload,
        progress: 100
    };
};
export const fetchUsersError = (error) => {
    return {
        type: REQUEST_FETCH_USERS_FAILURE,
        error: error,
        progress: 100
    }
};
export const fetchUsersProgress = () => {
    return {
        type: REQUEST_FETCH_USERS_PROGRESS,
        progress: 0
    };
};

/**
 * ==================  (CREATE USER) ==================
 */


export const createUserRequest = (formData) => {
    return {
        type: REQUEST_CREATE_USER,
        formData: formData,
        progress: 0
    };
};
export const createUserSuccess = (payload) => {
    return {
        type: REQUEST_CREATE_USER_SUCCESS,
        payload: payload,
        progress: 100
    };
};
export const createUserError = (error) => {
    return {
        type: REQUEST_CREATE_USER_FAILURE,
        error: true,
        progress: 100
    }
};
export const createUserProgress = () => {
    return {
        type: REQUEST_CREATE_USER_PROGRESS,
        progress: 0
    };
};


/**
 * ==================  (DELETE USER) ==================
 */

export const deleteUserRequest = (user) => {
    return {
        type: REQUEST_DELETE_USER,
        uid: user,
        progress: 0
    };
};
export const deleteUserSuccess = (payload) => {
    return {
        type: REQUEST_DELETE_USER_SUCCESS,
        payload: payload,
        progress: 100
    };
};
export const deleteUserError = (error) => {
    return {
        type: REQUEST_DELETE_USER_FAILURE,
        error: true,
        progress: 100
    }
};
export const deleteUserProgress = () => {
    return {
        type: REQUEST_DELETE_USER_PROGRESS,
        progress: 0
    };
};


/**
 * ==================  (STATUS USER) ==================
 */

export const statusUserRequest = () => {
    return {
        type: REQUEST_STATUS_USER,
        progress: 0
    };
};
export const statusUserSuccess = (payload) => {
    return {
        type: REQUEST_STATUS_USER_SUCCESS,
        payload: payload,
        progress: 100
    };
};
export const statusUserError = (error) => {
    return {
        type: REQUEST_STATUS_USER_FAILURE,
        error: true,
        progress: 100
    }
};
export const statusUserProgress = () => {
    return {
        type: REQUEST_STATUS_USER_PROGRESS,
        progress: 0
    };
};

/**
 * ==================  (EDIT USER) ==================
 */

export const userEditRequest = (formData) => {
    return {
        type: REQUEST_EDIT_USER,
        formData: formData,
        progress: 0
    }
}

export const userEditSuccess = (payload) => {
    return {
        type: REQUEST_EDIT_USER_SUCCESS,
        payload: payload,
        progress: 100
    }
}
export const userEditError = (error) => {
    return {
        type: REQUEST_EDIT_USER_FAILURE,
        error: error,
        progress: 100
    }
}



/**
 * ==================  (GET USER) ==================
 */

export const getUserRequest = (user) => {
    return {
        type: REQUEST_GET_USER,
        user: user,
        progress: 0
    }
}

export const getUserSuccess = (payload) => {
    return {
        type: REQUEST_GET_USER_SUCCESS,
        payload: payload,
        progress: 100
    }
}

export const getUserError = (error) => {
    return {
        type: REQUEST_GET_USER_FAILURE,
        error: error,
        progress: 100
    }
}


/**
 * ==================  (IMPORT USER) ==================
 */

export const importUsersRequest = (formData) => {
    return {
        type: REQUEST_IMPORT_USERS,
        formData: formData,
        progress: 0
    }
}

export const importUsersSuccess = (payload) => {
    return {
        type: REQUEST_IMPORT_USERS_SUCCESS,
        payload: payload,
        progress: 100
    }
}
export const importUsersError = (error) => {
    return {
        type: REQUEST_IMPORT_USERS_FAILURE,
        error: error,
        progress: 100
    }
}

export const importUsersProgress = () => {
    return {
        type: REQUEST_IMPORT_USERS_PROGRESS,
        progress: 0
    }
}