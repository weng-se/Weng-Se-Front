import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';

const Customers = ({match}) => (
    <div className="app-wrapper">
        <Switch>
            <Route path={`${match.url}/lists`} component={asyncComponent(() => import('./routes/lists'))}/>
            <Route path={`${match.url}/create`} component={asyncComponent(() => import('./routes/create'))}/>
            <Route path={`${match.url}/import`} component={asyncComponent(() => import('./routes/import'))}/>
        </Switch>
    </div>
);

export default Customers;


