import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'
import Settings from './Settings';
import Auth from './Auth';
import Orders from './Orders';
import Users from './Users';
import Checks from './Checks';
import Customers from './Customers';
import Suppliers from './Suppliers';


export default (history) => combineReducers({
  router: connectRouter(history),
  settings: Settings,
  auth: Auth,
  users: Users,
  orders: Orders,
  checks: Checks,
  customers: Customers,
  suppliers: Suppliers
});
