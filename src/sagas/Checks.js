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
    REQUEST_CREATE_REMISE,
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
    checkEditError,
    createOtherCheckSuccess,
    createRemiseSuccess,
    createRemiseError,
    editCheckRemiseSuccess,
    editCheckRemiseError
} from "../actions/Checks";
import {
    Properties
} from '../constants/Properties';
import axios from 'axios';


function* getChecks() {
    let payload = null,
        error = null;
    try {
        yield put(fetchChecksProgress());
        yield axios.get(`http://${Properties.host}:${Properties.port}/api/checks/findAll?status=VALIDATED&filter={%22include%22:[%22customer%22,%22remise%22]}`, {
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


function* createCheck(data) {
    let payload = null,
        error = null;

    try {

        yield put(createCheckProgress());
        yield axios.post(`http://${Properties.host}:${Properties.port}/api/checks`, data.formData)
            .then((res) => {
                if (res.status == 200)
                    payload = res.data
            }).catch((error) => {
                error = error
            });

        if (data.bool) {
            if (payload) yield put(createCheckSuccess(payload));
            else yield put(createCheckError(error));
        } else {
            if (payload) yield put(createOtherCheckSuccess(payload));
            else yield put(createCheckError(error));
        }

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
        yield axios.delete(`http://${Properties.host}:${Properties.port}/api/checks/${data.id}`, {
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
        yield axios.get(`http://${Properties.host}:${Properties.port}/api/checks/${data.id}`, {
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

function* editCheck(data) {
    let payload = null,
        error = null;
    try {
        yield axios.post(`http://${Properties.host}:4000/api/checks/update?where={"id":"${data.formData.id}"}`, data.formData)
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


/**
 * CREATE CHECK
 */

function* createRemise(data) {

    var dataCheck;

    let payload = null,
        error = null,
        payloadCheck = null,
        ids = [];

    data.data.amount = localStorage.getItem('totalAmount');
    data.data.numberCheck = localStorage.getItem('numberCheck');

    try {

        yield axios.post(`http://${Properties.host}:${Properties.port}/api/remises`, data.data)
            .then((res) => {
                if (res.status == 200) {
                    payload = res.data;
                }
            }).catch((error) => {
                error = error
            });
        if (payload) {

            dataCheck = {
                "remise_id": payload.id,
                "remiseId": payload.id
            }

            //ids = ["test","5d6d2bcd66fc7efdb6435625", "5d6d2d1566fc7efdb6435627"]

            ids.push(payload.id)
            let idCheck = []
            idCheck.push(localStorage.getItem('ids').split(','))

            ids.push(...idCheck[0])




            yield axios.post(`http://localhost:4000/api/checks/updateAllCheck`, ids)
                .then((res) => payloadCheck = res.data)
                .catch((error) => error = error);

            if (payloadCheck) {
                yield put(editCheckRemiseSuccess(payloadCheck))
            } else {
                yield put(editCheckRemiseError(error))
            }

        }
        if (data.bool) {
            if (payload) yield put(createRemiseSuccess(payload));
            else yield put(createRemiseError(error));
        } else {

            yield put(createRemiseError(error));
        }

    } catch (error) {
        yield put(createCheckError(error));
    }
}

export function* watchCreateRemise() {
    yield takeLatest(REQUEST_CREATE_REMISE, createRemise);
}

export default function* rootSaga() {
    yield all([
        fork(watchFetchChecks),
        fork(watchDeleteChecks),
        fork(watchCreateCheck),
        fork(watchGetCheck),
        fork(watchEditCheck),
        fork(watchCreateRemise)
    ]);
}