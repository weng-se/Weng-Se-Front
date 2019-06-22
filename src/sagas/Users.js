import {
    all,
    call,
    put,
    fork,
    takeLatest
} from "redux-saga/effects";
import {
    REQUEST_FETCH_USERS,
    REQUEST_PROGRESS_USERS,
    REQUEST_SUCCESS_USERS,
    REQUEST_FAILURE_USERS,
    REQUEST_PROGRESS_CREATE_USER,
    REQUEST_SUCCESS_CREATE_USER,
    REQUEST_FAILURE_CREATE_USER,
    REQUEST_CREATE_USER,
} from "../actions/Users";
import axios from 'axios';



function* getUsers(data) {
    let payload = null,
        error = null;
    try {
        yield put({
            type: REQUEST_PROGRESS_USERS,
            progress: 0
        });
        yield axios.get('http://localhost:4000/api/Users', {
                // mode: 'cors',
                // credentials: 'include'
            })
            .then(function (res) {
                if (res.status == 200) payload = res.data
            }).catch(function (error) {
                error = error
            });

        if (payload) yield put({
            type: REQUEST_SUCCESS_USERS,
            payload: payload,
            progress: 100
        });
        else yield put({
            type: REQUEST_FAILURE_USERS,
            error: error,
            progress: 100
        });

    } catch (error) {
        yield put({
            type: REQUEST_FAILURE_USERS,
            error: error,
            progress: 100
        });
    }
}
export function* watchFetchUsers() {
    yield takeLatest(REQUEST_FETCH_USERS, getUsers);
}


/**
 * add new user
 */


function* createUser(data) {
    let payload = null,
        error = null;
    try {
        yield put({
            type: REQUEST_PROGRESS_CREATE_USER,
            progress: 0
        });
        yield axios.post('http://localhost:4000/api/Users', data.formData)
            .then(function (res) {
                if (res.status == 200) payload = res.data
            }).catch(function (error) {
                error = error
            });

        if (payload) yield put({
            type: REQUEST_SUCCESS_CREATE_USER,
            payload: payload,
            progress: 100
        });
        else yield put({
            type: REQUEST_FAILURE_CREATE_USER,
            error: error,
            progress: 100
        });

    } catch (error) {
        yield put({
            type: REQUEST_FAILURE_CREATE_USER,
            error: error,
            progress: 100
        });
    }
}
export function* watchCreateUser() {
    yield takeLatest(REQUEST_CREATE_USER, createUser);
}




/**
 * edit new user
 */





export default function* rootSaga() {
    yield all([
        fork(watchFetchUsers),
        fork(watchCreateUser)
    ]);
}