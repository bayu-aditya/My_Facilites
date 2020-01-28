import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route} from 'react-router-dom';

import { Dashboard } from './page/dashboard/organization';
import { Inventory } from './page/dashboard/inventory/inventory';
import { Timeline } from './page/dashboard/inventory/timeline/timeline';
import { Login } from './page/login/login'

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/dashboard/inventory" component={Inventory} />
                    <Route exact path="/dashboard/inventory/timeline" component={Timeline} />
                </Switch>
            </Router>
        )
    }
}

export {App};