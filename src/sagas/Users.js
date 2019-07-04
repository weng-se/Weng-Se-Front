import {
    all,
    call,
    put,
    fork,
    takeLatest
} from "redux-saga/effects";
import {
    REQUEST_FETCH_USERS,
    REQUEST_CREATE_USER,
    REQUEST_DELETE_USER,
    REQUEST_EDIT_USER,
    REQUEST_GET_USER
} from "../constants/ActionTypes";
import {
    fetchUsersSuccess,
    fetchUsersError,
    fetchUsersProgress,
    createUserProgress,
    createUserSuccess,
    createUserError,
    deleteUserSuccess,
    deleteUserError,
    userEditSuccess,
    userEditError,
    getUserSuccess,
    getUserError
} from "../actions/Users";
import axios from 'axios';



function* getUsers() {
    let payload = null,
        error = null;
    try {
        yield put(fetchUsersProgress());
        yield axios.get('http://localhost:4000/api/Users', {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                if (res.status == 200)
                    payload = res.data
            }).catch((error) => {
                error = error
            });

        if (payload) yield put(fetchUsersSuccess(payload));
        else yield put(fetchUsersError(error));

    } catch (error) {
        yield put(fetchUsersError(error));
    }
}
export function* watchFetchUsers() {
    yield takeLatest(REQUEST_FETCH_USERS, getUsers);
}

/**
 *  ADD NEW USER 
 */

function* createUser(data) {
    let payload = null,
        error = null,
        userData = data.formData;
    try {
        yield put(createUserProgress());
        yield axios.post('http://localhost:4000/api/Users', userData)
            .then((res) => {
                if (res.status == 200)
                    payload = res.data
            }).catch((error) => {
                error = error
            });

        if (payload) yield put(createUserSuccess(payload));
        else yield put(createUserError(error));

    } catch (error) {
        yield put(createUserError(error));
    }
}
export function* watchCreateUser() {
    yield takeLatest(REQUEST_CREATE_USER, createUser);
}

/**
 *  DELETE USER 
 */

function* deleteUser(data) {
    let payload = null,
        error = null;
    try {
        yield put(createUserProgress());
        yield axios.delete(`http://localhost:4000/api/Users/${data.uid}`)
            .then((res) => {
                if (res.status == 200)
                    payload = res.data
            }).catch((error) => {
                error = error
            });

        if (payload) yield put(deleteUserSuccess(payload));
        else yield put(deleteUserError(error));

    } catch (error) {
        yield put(deleteUserError(error));
    }
}
export function* watchDeleteUser() {
    yield takeLatest(REQUEST_DELETE_USER, deleteUser);
}

/**
 * ÈDIT USER
 */

function* editUser(action) {
    let payload = null,
        error = null;
    try {
        yield axios.post(`http://localhost:4000/api/Users/update?where={"id":"${action.formData.id}"}`, action.formData)
            .then((res) => payload = res.data)
            .catch((error) => error = error);
        if (payload) yield put(userEditSuccess(payload));
        else yield put(userEditError(error));
    } catch (error) {
        yield put(userEditError(error));
    }
}

export function* watchEditUser() {
    yield takeLatest(REQUEST_EDIT_USER, editUser);
}


/**
 * GET USER
 */

function* getUser(action) {
    let payload = null,
        error = null;

    try {
        yield axios.get(`http://localhost:4000/api/Users/${action.user}`)
            .then((res) => payload = res.data)
            .catch((error) => error = error);
        if (payload) yield put(getUserSuccess(payload));
        else yield put(getUserError(error));
    } catch (error) {
        yield put(getUserError(error));
    }
}

export function* watchGetUser() {
    yield takeLatest(REQUEST_GET_USER, getUser);
}


export default function* rootSaga() {
    yield all([
        fork(watchFetchUsers),
        fork(watchCreateUser),
        fork(watchDeleteUser),
        fork(watchGetUser),
        fork(watchEditUser)
    ]);
}