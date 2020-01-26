import React from 'react';
import { Add_inv } from '../../../component/adding';
import Navigation from '../../../component/navigation_bar';
import { List_Inventory } from './list_inventory';

import { auth_check, refresh_token } from '../../../action/auth.js';
import { get_access_token } from '../../../action/cookie.js';
import { List_Member } from './list_member';
import { GoToLogin } from '../../../component/redirect';

function retrieveAPI(self) {
    // self state exist:
    //      - access_token
    //      - user (optional)
    fetch("http://0.0.0.0:8888/user", {
        method: "GET",
        headers: {"Authorization": "Bearer "+self.state.access_token}
    })
    .then((response) => {
        if (response.status === 202) {
            return response.json();
        } else if (response.status === 401) {
            refresh_token(self);
        } else {
            throw Error(response.statusText);
        }
    })
    .then((jsonresp) => {
        if (jsonresp) {
            self.setState({user: jsonresp["name"]})
        }
    })
    .catch((error) => console.log(error))
}

export class Inventory extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            access_token: get_access_token(),
            user: null,
            auth: true
        }
    }
    componentDidMount() {
        this.setState({auth: auth_check()})
        retrieveAPI(this);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.access_token != this.state.access_token) {
            retrieveAPI(this);
        }
    }
    checkAuth() {
        if (this.state.auth === false) return <GoToLogin />
    }
    render() {
        return (
            <div>
                {this.checkAuth()}
                <Navigation name={this.state.user} />
                <div className="row">
                    <div className="container-sm pt-3 mt-3 border col-sm-7">
                        <h3>My Inventory</h3>
                        <Add_inv access_token={this.state.access_token} />
                        <List_Inventory access_token={this.state.access_token} />
                    </div>
                    <div className="container-sm pt-3 mt-3 border col-sm-4">
                        <h3>People in this Organization</h3>
                        <List_Member access_token={this.state.access_token} />
                    </div>
                </div>
            </div>
        )   
    }
}