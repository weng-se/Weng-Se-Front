import {
    all,
    call,
    put,
    fork,
    takeLatest
} from "redux-saga/effects";
import {
    IMPORT_ORDER_REQUEST,
    IMPORT_ORDER_SUCCESS,
    IMPORT_ORDER_FAILURE,
    IMPORT_ORDER_PROGRESS
} from "../actions/Orders";
import axios from 'axios';

function* importOrders(data) {
    let dataSet = JSON.parse(data.value);
    let payload = null,
        error = null;
    try {
        yield put({
            type: IMPORT_ORDER_PROGRESS,
            progress: 0
        });
        yield axios.post('http://localhost:4000/api/orders', {
                "id": null,
                "oldId": "200000",
                "deliveryDate": "2019-03-08T00:00:00.000Z",
                "customers": "SAMIA",
                "shippers": "WS",
                "numberPallets": "2",
                "printBPLabel": "L",
                "preparation": "OSSOUMANE",
                "controllerBP": "L",
                "controlBPDate": "12:03:00",
                "printBL": "L",
                "controllerBL": "A",
                "total_ht": "1537.40 ",
                "driver": "ALPHA",
                "controllerBLSigned": "",
                "numberBL": "17462"
            })
            .then(function (res) {
                if (res.status == 200) payload = res.data
            }).catch(function (error) {
                error = error
            });

        if (payload) yield put({
            type: IMPORT_ORDER_SUCCESS,
            payload: payload,
            progress: 100
        });
        else yield put({
            type: IMPORT_ORDER_FAILURE,
            error: error,
            progress: 100
        });

    } catch (error) {
        yield put({
            type: IMPORT_ORDER_FAILURE,
            error: error,
            progress: 100
        });
    }
}


export function* watchImportOrders() {
    yield takeLatest(IMPORT_ORDER_REQUEST, importOrders);
}


export default function* rootSaga() {
    yield all([fork(watchImportOrders)]);
}