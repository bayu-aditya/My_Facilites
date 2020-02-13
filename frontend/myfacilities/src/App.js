import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route} from 'react-router-dom';

import { RouteWithLayout } from './component';
import Main from './layout';
import { 
    Login,
    Register,
    Profile,
    Dashboard as Next_Dashboard,
    Inventory as Next_Inventory,
    Timeline as Next_Timeline } from './views';

import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import storeAndPersistor from './store';

const { store, persistor } = storeAndPersistor();

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                <Router>
                    <Switch>
                        <Route 
                            component={Login} 
                            exact 
                            path="/"/>
                        <Route 
                            component={Register} 
                            exact 
                            path="/register" />
                        <RouteWithLayout 
                            layout={Main}
                            component={Profile}
                            exact
                            path="/profile"
                        />
                        <RouteWithLayout
                            layout={Main}
                            component={Next_Dashboard}
                            exact 
                            path="/next_dashboard"
                        />
                        <RouteWithLayout
                            layout={Main}
                            component={Next_Inventory}
                            exact 
                            path="/next_dashboard/next_inventory"
                        />
                        <RouteWithLayout
                            layout={Main}
                            component={Next_Timeline}
                            exact 
                            path="/next_dashboard/next_inventory/next_timeline"
                        />
                    </Switch>
                </Router>
                </PersistGate>
            </Provider>
        )
    }
}

export {App};