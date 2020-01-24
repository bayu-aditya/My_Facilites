import React from 'react';
import Navigation from '../../component/navigation_bar';
import {Table_list_organization_new} from './list_organization';

import { GoToLogin } from '../../component/redirect';
import { auth_check } from '../../action/auth.js';
import { get_access_token, get_refresh_token } from '../../action/cookie.js';

export class Dashboard extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            auth: false,
            user: "user",
        }
        this.access_token = get_access_token();
        this.refresh_token = get_refresh_token
    }
    componentWillMount() {
        this.setState({auth: auth_check()})
    }
    componentDidMount() {
        fetch("http://0.0.0.0:8888/user", {
            method: 'GET',
            headers: {"Authorization": "Bearer "+this.refresh_token}
        })
        .then((response) => {
            if (response.status === 202){
                return response.json()
            } else if (response.status === 401) {
                throw Error(response.statusText);
            }
        })
        .then((jsonresp) => {
            this.setState({user: jsonresp["username"]})
        })
        .catch((error) => {
            console.log(error)
        })
    }
    checkAuth() {
        if (this.state.auth === false) return <GoToLogin />
    }
    render() {
        return (
            <div>
                {this.checkAuth()}
                <Navigation />
                <div className="row">
                    <div className="container-sm pt-3 mt-3 border col-sm-7">
                        <h3>My Organizations</h3>
                        <Table_list_organization_new access_token={this.access_token}/>
                    </div>
                    <div className="container-sm pt-3 mt-3 border col-sm-3">
                        <h5>Hello {this.state.user} !</h5>
                    </div>
                </div>
            </div>
        )
    }
}