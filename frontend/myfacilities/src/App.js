import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route} from 'react-router-dom';

import { Dashboard } from './page/dashboard/dashboard';
import { Login } from './page/login/login'

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route path="/login" component={Login}/>
                </Switch>
            </Router>
        )
    }
}

export {App};