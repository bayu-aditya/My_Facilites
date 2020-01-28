import React from 'react';
import Navigation from '../../../../component/navigation_bar';
import { auth_check, refresh_token } from '../../../../action/auth.js';
import { get_access_token, get_cookie } from '../../../../action/cookie';
import { GoToLogin } from '../../../../component/redirect';
import { user_api } from '../../../../api/link.js';
import { Graph_Timeline } from './graph_timeline';
import { List_timeline } from './list_timeline';

function retrieveAPI(self) {
    // self state exist:
    //      - access_token
    //      - user (optional)
    fetch(user_api(), {
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

export class Timeline extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            access_token: get_access_token(),
            id_org: get_cookie("_id_org"),
            id_inv: get_cookie("_id_inv"),
            user: null,
            auth: true,
        }
    }
    componentDidMount() {
        this.setState({auth: auth_check()})
        retrieveAPI(this);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.access_token !== this.state.access_token) {
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
                <div className="container-sm pt-3 mt-3 border col-sm-7">
                    <Graph_Timeline />
                </div>
                <div className="container-sm pt-3 mt-3 border col-sm-7">
                    <h3>Tasks</h3>
                    <List_timeline />
                    {/* <h6>Hallo {} Timeline Inventory ke- {this.state.id_inv}</h6> */}
                </div>
            </div>
        )
    }
}