import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';

const Dashboard = ({match}) => (
    <div className="app-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/default`}/>
            <Route path={`${match.url}/listSuppliers`} component={asyncComponent(() => import('./routes/listSuppliers'))}/>
            <Route path={`${match.url}/addSupplier`} component={asyncComponent(() => import('./routes/addSupplier'))}/>
            <Route path={`${match.url}/updateSupplier`} component={asyncComponent(() => import('./routes/updateSupplier'))}/>
        </Switch>
    </div>
);

export default Dashboard;