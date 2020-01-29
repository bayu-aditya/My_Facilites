import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route} from 'react-router-dom';

import Dashboard from './page/dashboard/organization';
import { Inventory } from './page/dashboard/inventory/inventory';
import { Timeline } from './page/dashboard/inventory/timeline/timeline';
import Login from './page/login/login'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'
import {reducers} from './reducer';
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
  }

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(
    persistedReducer,
    applyMiddleware(thunk)
    );
const persistor = persistStore(store);

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Login} />
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