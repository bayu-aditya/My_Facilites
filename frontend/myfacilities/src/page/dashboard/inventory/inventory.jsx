import React from 'react';
import { Redirect } from 'react-router-dom';
import { Add_inv } from '../../../component/adding';
import Navigation from '../../../component/navigation_bar';
import { List_Inventory } from './list_inventory';

import { auth_check } from '../../../action/auth.js';
import { get_access_token } from '../../../action/cookie.js';

export class Inventory extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            auth: false
        }
        this.access_token = get_access_token();
    }
    componentWillMount() {
        this.setState({auth: auth_check()})
    }
    checkAuth() {
        if (this.state.auth === false) return <Redirect to="/" />
    }
    render() {
        return (
            <div>
                {this.checkAuth()}
                <Navigation />
                <div className="row">
                    <div className="container-sm pt-3 mt-3 border col-sm-5">
                        <h3>My Inventory</h3>
                        <Add_inv access_token={this.access_token} />
                        <List_Inventory access_token={this.access_token} />
                    </div>
                </div>
            </div>
        )
    }
}