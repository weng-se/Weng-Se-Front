import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';

const Dashboard = ({match}) => (
    <div className="app-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/default`}/>
            <Route path={`${match.url}/Reporting1`} component={asyncComponent(() => import('./routes/Reporting1'))}/>
            <Route path={`${match.url}/Reporting2`} component={asyncComponent(() => import('./routes/Reporting2'))}/>
            <Route path={`${match.url}/Reporting3`} component={asyncComponent(() => import('./routes/Reporting3'))}/>
            <Route path={`${match.url}/Reporting4`} component={asyncComponent(() => import('./routes/Reporting4'))}/> 
        </Switch>
    </div>
);

export default Dashboard;