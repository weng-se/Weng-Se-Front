import {
    all,
    call,
    put,
    fork,
    takeLatest
} from "redux-saga/effects";
import {
    REQUEST_FETCH_CHECKS,
    REQUEST_DELETE_CHECK,
    REQUEST_CREATE_CHECK,
    REQUEST_GET_CHECK,
    REQUEST_EDIT_CHECK,
} from "../constants/ActionTypes";
import {
    fetchChecksProgress,
    fetchChecksSuccess,
    fetchChecksError,
    deleteCheckProgress,
    deleteCheckSuccess,
    deleteCheckError,
    createCheckError,
    createCheckSuccess,
    createCheckProgress,
    getCheckProgress,
    getCheckSuccess,
    getCheckError,
    checkEditSuccess,
    checkEditError
} from "../actions/Checks";
import axios from 'axios';


function* getChecks() {
    let payload = null,
        error = null;
    try {
        yield put(fetchChecksProgress());
        yield axios.get(`http://localhost:4000/api/checks?filter={%22include%22:[%22customer%22,%22remise%22]}`, {
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

        if (payload) yield put(fetchChecksSuccess(payload));
        else yield put(fetchChecksError(error));

    } catch (error) {
        yield put(fetchChecksError(error));
    }
}
export function* watchFetchChecks() {
    yield takeLatest(REQUEST_FETCH_CHECKS, getChecks);
}



/**
 * CREATE CHECK
 */


function* createCheck(action) {
    let payload = null,
        error = null;
    try {
        yield put(createCheckProgress());
        yield axios.post(`http://localhost:4000/api/checks`, action.formData)
            .then((res) => {
                if (res.status == 200)
                    payload = res.data
            }).catch((error) => {
                error = error
            });

        if (payload) yield put(createCheckSuccess(payload));
        else yield put(createCheckError(error));

    } catch (error) {
        yield put(createCheckError(error));
    }
}
export function* watchCreateCheck() {
    yield takeLatest(REQUEST_CREATE_CHECK, createCheck);
}


/**
 * DELETE CHECK
 */


function* deleteCheck(data) {
    let payload = null,
        error = null;
    try {
        yield put(deleteCheckProgress());
        yield axios.delete(`http://localhost:4000/api/checks/${data.id}`, {
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

        if (payload) yield put(deleteCheckSuccess(payload));
        else yield put(deleteCheckError(error));

    } catch (error) {
        yield put(deleteCheckError(error));
    }
}
export function* watchDeleteChecks() {
    yield takeLatest(REQUEST_DELETE_CHECK, deleteCheck);
}





/**
 * GET CHECK
 */

function* getCheck(data) {
    let payload = null,
        error = null;
    try {
        yield put(getCheckProgress());
        yield axios.get(`http://localhost:4000/api/checks/${data.id}`, {
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

        if (payload) yield put(getCheckSuccess(payload));
        else yield put(getCheckError(error));

    } catch (error) {
        yield put(getCheckError(error));
    }
}
export function* watchGetCheck() {
    yield takeLatest(REQUEST_GET_CHECK, getCheck);
}





/**
 * ÈDIT USER
 */

function* editCheck(action) {
    let payload = null,
        error = null;
    try {
        yield axios.post(`http://localhost:4000/api/checks?where={"id":"${action.formData.id}"}`, action.formData)
            .then((res) => payload = res.data)
            .catch((error) => error = error);
        if (payload) yield put(checkEditSuccess(payload));
        else yield put(checkEditError(error));
    } catch (error) {
        yield put(checkEditError(error));
    }
}

export function* watchEditCheck() {
    yield takeLatest(REQUEST_EDIT_CHECK, editCheck);
}



export default function* rootSaga() {
    yield all([
        fork(watchFetchChecks),
        fork(watchDeleteChecks),
        fork(watchCreateCheck),
        fork(watchGetCheck),
        fork(watchEditCheck)
    ]);
}