import {all} from 'redux-saga/effects';
import authSagas from './Auth';
import OrdersSagas from './Orders';
import UsersSagas from './Users';
import ChecksSagas from './Checks';
import CustomersSagas from './Customers';
import SuppliersSagas from './Suppliers';
import BanksSagas from './Banks';


export default function* rootSaga(getState) {
    yield all([
        authSagas(),
        OrdersSagas(),
        UsersSagas(),
        ChecksSagas(),
        CustomersSagas(),
        SuppliersSagas(),
        BanksSagas()
    ]);
}
