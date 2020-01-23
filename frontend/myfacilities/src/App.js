import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route} from 'react-router-dom';

import { Dashboard } from './page/dashboard/dashboard';
import { Inventory } from './page/dashboard/inventory/inventory';
import { Login } from './page/login/login'

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/dashboard/inventory" component={Inventory} />
                </Switch>
            </Router>
        )
    }
}

export {App};