import {
    all,
    call,
    put,
    fork,
    takeLatest
} from "redux-saga/effects";
import {
    REQUEST_CREATE_BANK,
} from "../constants/ActionTypes";
import {
    createBankProgress, 
    createBankSuccess, 
    createBankError
} from "../actions/Banks";
import axios from 'axios';

function* create(data) {
    let payload = null,
        error = null;
    try {
        yield put(createBankProgress());
        yield axios.post(`http://localhost:4000/api/banks`, data.formData)
            .then((res) => {
                if (res.status == 200)
                    payload = res.data
            }).catch((error) => {
                error = error
            });

        if (payload) yield put(createBankSuccess(payload));
        else yield put(createBankError(error));

    } catch (error) {
        yield put(createBankError(error));
    }
}
export function* watchCreateBank() {
    yield takeLatest(REQUEST_CREATE_BANK, create);
}


export default function* rootSaga() {
    yield all([
        fork(watchCreateBank),
    ]);
}