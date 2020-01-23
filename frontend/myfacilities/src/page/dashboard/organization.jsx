import React from 'react';
import Navigation from '../../component/navigation_bar';
import {Table_list_organization_new} from './list_organization';
import { Redirect } from 'react-router-dom';

import { GoToLogin } from '../../component/redirect';
import { auth_check } from '../../action/auth.js';
import { get_access_token } from '../../action/cookie.js';

export class Dashboard extends React.Component{
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
        if (this.state.auth === false) return <GoToLogin />
    }
    render() {
        return (
            <div>
                {this.checkAuth()}
                <Navigation />
                <div className="row">
                    <div className="container-sm pt-3 mt-3 border col-sm-5">
                        <h3>My Organizations</h3>
                        <Table_list_organization_new access_token={this.access_token}/>
                    </div>
                </div>
            </div>
        )
    }
}