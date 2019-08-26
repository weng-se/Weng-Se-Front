

import {
    all,
    call,
    put,
    fork,
    takeLatest
} from "redux-saga/effects";

import {
    REQUEST_FETCH_SUPPLIERS,
    REQUEST_CREATE_SUPPLIER,
    REQUEST_DELETE_SUPPLIER,
    REQUEST_GET_SUPPLIER,
    REQUEST_EDIT_SUPPLIER
    
} from "../constants/ActionTypes";
import {
    fetchSuppliersSuccess,
    fetchSuppliersError,
    createSupplierSuccess,
    createSupplierFailure,
    createSupplierProgress,
    deleteSupplierSuccess,
    deleteSupplierFailure,
    deleteSupplierProgress,
    getSupplierFailure,
    getSupplierSuccess,
    editSupplierSuccess,
    editSupplierFailure
} from "../actions/Suppliers";
import { 
    Properties 
} from './../constants/Properties';
import axios from 'axios';



/**
 * get all suppliers
 */
function* getSuppliers() {
    let payload = null,
    error = null;
  
try {
    
    yield axios.get(`http://${Properties.host}:${Properties.port}/api/Suppliers`, {
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

    if (payload) yield put(fetchSuppliersSuccess(payload));
    else yield put(fetchSuppliersError(error));

} catch (error) {
    yield put(fetchSuppliersError(error));
}
}


export function* watchGetSuppliers() {
    yield takeLatest(REQUEST_FETCH_SUPPLIERS, getSuppliers);
}


/**
 * add suppliers
 */

function* createSupplier(data) {
   
    let payload = null,
        error = null;

      
        
    try {
        yield put(createSupplierProgress());
        yield axios.post(`http://${Properties.host}:${Properties.port}/api/suppliers`, data.payload)
            .then((res) => {
                if (res.status == 200)
                    payload = res.data
            }).catch((error) => {
                error = error
            });

        if (payload) yield put(createSupplierSuccess(payload));
        else yield put(createSupplierFailure(error));

    } catch (error) {
        yield put(createSupplierFailure(error));
    }
}
export function* watchCreateSupplier() {
    yield takeLatest(REQUEST_CREATE_SUPPLIER, createSupplier);
}


/**
 * delete Supplier
 */

function* deleteSupplier(data) {
    
    let payload = null,
        error = null;
    try {
        yield put(deleteSupplierProgress());
        yield axios.delete(`http://${Properties.host}:${Properties.port}/api/suppliers/${data.id}`, {
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

        if (payload) yield put(deleteSupplierSuccess(payload));
        else yield put(deleteSupplierFailure(error));

    } catch (error) {
        yield put(deleteSupplierFailure(error));
    }
}
export function* watchDeleteSupplier() {
    yield takeLatest(REQUEST_DELETE_SUPPLIER, deleteSupplier);
}

/**
 * GET SUPPLIER
*/
function* getSupplier(data) {
    
    let payload = null,
        error = null;
    try {
        
        yield axios.get(`http://${Properties.host}:${Properties.port}/api/suppliers/${data.id}`, {
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

        if (payload) yield put(getSupplierSuccess(payload));
        else yield put(getSupplierFailure(error));

    } catch (error) {
        yield put(getSupplierFailure(error));
    }
}
export function* watchGetSupplier() {
    yield takeLatest(REQUEST_GET_SUPPLIER, getSupplier);
}

/**
 * UPDATE SUPPLIER
 */

function* editSupplier(action) {

  
    
    
    let payload = null,
        error = null;
    try {
        yield axios.post(`http://${Properties.host}:${Properties.port}/api/suppliers/update?where={"id":"${action.formData.id}"}`, action.formData)
            .then((res) => payload = res.data)
            .catch((error) => error = error);
        if (payload) yield put(editSupplierSuccess(payload));
        else yield put(editSupplierFailure(error));
    } catch (error) {
        yield put(editSupplierFailure(error));
    }
}

export function* watchEditSupplier() {
    yield takeLatest(REQUEST_EDIT_SUPPLIER, editSupplier);
}


export default function* rootSaga() {
    yield all([
        watchGetSuppliers(),
        watchCreateSupplier(),
        watchDeleteSupplier(),
        watchGetSupplier(),
        watchEditSupplier()
        
    ]);
}