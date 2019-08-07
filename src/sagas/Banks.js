import {
    all,
    call,
    put,
    fork,
    takeLatest
} from "redux-saga/effects";
import {
    REQUEST_CREATE_BANK, 
    REQUEST_FETCH_BANK, 
    REQUEST_DELETE_BANK, 
    REQUEST_GET_BANK,
    REQUEST_EDIT_BANK,
} from "../constants/ActionTypes";
import {
    createBankProgress, 
    createBankSuccess, 
    createBankError,
    fetchBankProgress,
    fetchBankSuccess,
    fetchBankError,
    deleteBankProgress,
    deleteBankSuccess,
    deleteBankError,
    getBankSuccess,
    getBankError,
    getBankProgress,
    updateBankSuccess,
    updateBankError,
    updateBankProgress
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



function* fetchBanks() {
    let payload = null,
        error = null;
    try {
        yield put(fetchBankProgress());
        yield axios.get(`http://localhost:4000/api/banks`, {
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

        if (payload) yield put(fetchBankSuccess(payload));
        else yield put(fetchBankError(error));

    } catch (error) {
        yield put(fetchBankError(error));
    }
}
export function* watchFetchBanks() {
    yield takeLatest(REQUEST_FETCH_BANK, fetchBanks);
}




function* deleteBank(data) {
    let payload = null,
        error = null;

    try {
        yield put(deleteBankProgress());
        yield axios.delete(`http://localhost:4000/api/banks/${data.id}`, {
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

        if (payload) yield put(deleteBankSuccess(payload));
        else yield put(deleteBankError(error));

    } catch (error) {
        yield put(deleteBankError(error));
    }
}
export function* watchDeleteBank() {
    yield takeLatest(REQUEST_DELETE_BANK, deleteBank);
}





function* getBank(data) {
    let payload = null,
        error = null;
    try {
        yield put(getBankProgress());
        yield axios.get(`http://localhost:4000/api/banks/${data.id}`, {
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

        if (payload) yield put(getBankSuccess(payload));
        else yield put(getBankError(error));

    } catch (error) {
        yield put(getBankError(error));
    }
}
export function* watchGetBank() {
    yield takeLatest(REQUEST_GET_BANK, getBank);
}







function* updateBank(data) {
    let payload = null,
        error = null;
    try {
        yield put(updateBankProgress());
        yield axios.post(`http://localhost:4000/api/banks/update?where={"id":"${data.formData.id}"}`, data.formData)
            .then((res) => payload = res.data)
            .catch((error) => error = error);
        if (payload) yield put(updateBankSuccess(payload));
        else yield put(updateBankError(error));
    } catch (error) {
        yield put(updateBankError(error));
    }
}


export function* watchUpdateCheck() {
    yield takeLatest(REQUEST_EDIT_BANK, updateBank);
}




export default function* rootSaga() {
    yield all([
        fork(watchCreateBank),
        fork(watchFetchBanks),
        fork(watchDeleteBank),
        fork(watchGetBank),
        fork(watchUpdateCheck)
    ]);
}