import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route} from 'react-router-dom';

import Dashboard from './page/dashboard/organization';
import Inventory from './page/dashboard/inventory/inventory';
import Timeline from './page/dashboard/inventory/timeline/timeline';
import Login from './page/login/login';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import storeAndPersistor from './store';
import Register from './page/register/register';

const { store, persistor } = storeAndPersistor();

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route exact path="/dashboard/inventory" component={Inventory} />
                        <Route exact path="/dashboard/inventory/timeline" component={Timeline} />
                    </Switch>
                </Router>
                </PersistGate>
            </Provider>
        )
    }
}

export {App};