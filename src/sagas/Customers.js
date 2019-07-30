import {
    all,
    call,
    put,
    fork,
    takeLatest
} from "redux-saga/effects";
import {
    REQUEST_FETCH_CUSTOMERS,
    REQUEST_CREATE_CUSTOMER,
    REQUEST_DELETE_CUSTOMER,
    REQUEST_EDIT_CUSTOMER,
    REQUEST_GET_CUSTOMER
} from "../constants/ActionTypes";
import {
    fetchCustomersProgress,
    fetchCustomersSuccess,
    fetchCustomersError,
    createCustomerProgress,
    createCustomerSuccess,
    createCustomerError,
    deleteCustomerSuccess,
    deleteCustomerError,
    deleteCustomerProgress,
    editCustomerProgress,
    editCustomerSuccess,
    editCustomerError,
    getcustomerSuccess,
    getCustomerError
} from "../actions/Customers";
import {

} from "../actions/Users";
import axios from 'axios';




function* getCustomers() {
    let payload = null,
        error = null;
    try {
        yield put(fetchCustomersProgress());
        yield axios.get('http://localhost:4000/api/costumers', {
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

        if (payload) yield put(fetchCustomersSuccess(payload));
        else yield put(fetchCustomersError(error));

    } catch (error) {
        yield put(fetchCustomersError(error));
    }
}
export function* watchFetchCustomers() {
    yield takeLatest(REQUEST_FETCH_CUSTOMERS, getCustomers);
}

/**
 *  ADD NEW USER 
 */

function* createCustomer(data) {
    let payload = null,
        error = null,
        userData = data.formData;
    try {
        yield put(createCustomerProgress());
        yield axios.post('http://localhost:4000/api/costumers', {
                "isRemoved ": false,
                "type": "string",
                "civility": "string",
                "firstName": "Test",
                "lastName": "12/02/2018",
                "dateBirth": "2019-02-12T21:30:41.676Z",
                "pictureSrc": "string",
                "email": "string",
                "newsletter": true,
                "sendEmailing": true,
                "sendSMS": true,
                "department": "string",
                "timezone": "string",
                "address": "string",
                "city": "string",
                "country": "string",
                "websiteURL": "string",
                "skype": "string",
                "phone": "string",
                "mobile": "string",
                "fax": "string",
                "title": "string",
                "status": "string",
                "bank": "string",
                "iban": "string",
                "bic": "string",
                "oldId": "string",
                "family": "string",
                "tva": "string",
                "accountingAccount": "string",
                "tvaCode": "string",
                "tvaExport": "string",
                "siren": "string",
                "siret": "string",
                "salesPerson": "string",
                "isActive": true,
                "language": true,
                "paymentMethod": "string",
                "bankReglement": "string",
                "lastOrder": "2019-02-12T21:30:41.676Z"
            })
            .then((res) => {
                if (res.status == 200)
                    payload = res.data
            }).catch((error) => {
                error = error
            });

        if (payload) yield put(createCustomerSuccess(payload));
        else yield put(createCustomerError(error));

    } catch (error) {
        yield put(createCustomerError(error));
    }
}
export function* watchCreateCustomer() {
    yield takeLatest(REQUEST_CREATE_CUSTOMER, createCustomer);
}

/**
 *  DELETE USER 
 */

function* deleteCustomer(data) {
    let payload = null,
        error = null;
    try {
        yield put(deleteCustomerProgress());
        yield axios.delete(`http://localhost:4000/api/costumers/${data.uid}`)
            .then((res) => {
                if (res.status == 200)
                    payload = res.data
            }).catch((error) => {
                error = error
            });

        if (payload) yield put(deleteCustomerSuccess(payload));
        else yield put(deleteCustomerError(error));

    } catch (error) {
        yield put(deleteCustomerError(error));
    }
}
export function* watchDeleteCustomer() {
    yield takeLatest(REQUEST_DELETE_CUSTOMER, deleteCustomer);
}

/**
 * ÈDIT USER
 */

function* editCustomer(action) {
    let payload = null,
        error = null;

    try {
        yield put(editCustomerProgress());
        yield axios.post(`http://localhost:4000/api/costumers/update?where={"id":"${action.formData.id}"}`, action.formData)
            .then((res) => payload = res.data)
            .catch((error) => error = error);
        if (payload) yield put(editCustomerSuccess(payload));
        else yield put(editCustomerError(error));
    } catch (error) {
        yield put(editCustomerProgress(error));
    }
}

export function* watchEditCustomer() {
    yield takeLatest(REQUEST_EDIT_CUSTOMER, editCustomer);
}


/**
 * GET USER
 */

function* getCustomer(action) {
    let payload = null,
        error = null;

    try {
        yield axios.get(`http://localhost:4000/api/costumers/${action.customer}`)
            .then((res) => payload = res.data)
            .catch((error) => error = error);
        if (payload) yield put(getcustomerSuccess(payload));
        else yield put(getCustomerError(error));
    } catch (error) {
        yield put(getCustomerError(error));
    }
}

export function* watchGetCustomer() {
    yield takeLatest(REQUEST_GET_CUSTOMER, getCustomer);
}


export default function* rootSaga() {
    yield all([
        fork(watchFetchCustomers),
        fork(watchCreateCustomer),
        fork(watchDeleteCustomer),
        fork(watchGetCustomer),
        fork(watchEditCustomer)
    ]);
}