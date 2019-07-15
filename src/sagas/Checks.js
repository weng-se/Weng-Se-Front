import {
    all,
    call,
    put,
    fork,
    takeLatest
} from "redux-saga/effects";
import {
    REQUEST_FETCH_CHECKS, REQUEST_DELETE_CHECK,
} from "../constants/ActionTypes";
import {
    fetchChecksProgress,
    fetchChecksSuccess,
    fetchChecksError,
    deleteCheckProgress,
    deleteCheckSuccess,
    deleteCheckError
} from "../actions/Checks";
import axios from 'axios';


function* getChecks() {
    let payload = null, error = null;
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

function* deleteCheck(data) {
    let payload = null, error = null;
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

export default function* rootSaga() {
    yield all([
        fork(watchFetchChecks),
        fork(watchDeleteChecks)
    ]);
}