import {all} from 'redux-saga/effects';
import authSagas from './Auth';
import OrdersSagas from './Orders';
import UsersSagas from './Users';
import ChecksSagas from './Checks';
import CustomersSagas from './Customers';


export default function* rootSaga(getState) {
    yield all([
        authSagas(),
        OrdersSagas(),
        UsersSagas(),
        ChecksSagas(),
        CustomersSagas()
    ]);
}
