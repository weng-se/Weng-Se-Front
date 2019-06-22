import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';

const Dashboard = ({match}) => (
    <div className="app-wrapper">
        <Switch>
            <Route path={`${match.url}/listUser`} component={asyncComponent(() => import('./routes/listUser/'))}/>
            <Route path={`${match.url}/addUser`} component={asyncComponent(() => import('./routes/addUser/'))}/>
            <Route path={`${match.url}/editUser`} component={asyncComponent(() => import('./routes/editUser/'))}/>
            <Route path={`${match.url}/profile`} component={asyncComponent(() => import('./routes/profile/'))}/>
        </Switch>
    </div>
);

export default Dashboard;


