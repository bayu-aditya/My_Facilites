import React from 'react';
import Navigation from '../../component/navigation_bar';
import {Table_list_organization_new} from './list_organization';

import { GoToLogin } from '../../component/redirect';
import { auth_check, refresh_token } from '../../action/auth.js';
import { get_access_token } from '../../action/cookie.js';

export class Dashboard extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            auth: true,
            user: null,
            access_token: get_access_token()
        }
    }
    retrieveAPI = () => {
        let self = this;
        fetch("http://0.0.0.0:8888/user", {
            method: 'GET',
            headers: {"Authorization": "Bearer "+this.state.access_token}
        })
        .then((response) => {
            if (response.status === 202) {
                return response.json()
            } else if (response.status === 401) {
                refresh_token(self);
            } else {
                throw Error(response.statusText);
            }
        })
        .then((jsonresp) => {
            if (jsonresp) {
                this.setState({user: jsonresp["name"]})
            }
        })
        .catch((error) => console.log(error))
    }
    componentDidMount() {
        this.setState({auth: auth_check()})
        this.retrieveAPI()
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.access_token != this.state.access_token) {
            this.retrieveAPI();
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
                        <h3>My Organizations</h3>
                        <Table_list_organization_new access_token={this.state.access_token}/>
                    </div>
                    <div className="container-sm pt-3 mt-3 border col-sm-3">
                        <h5>Hello {this.state.user} !</h5>
                    </div>
                </div>
            </div>
        )
    }
}