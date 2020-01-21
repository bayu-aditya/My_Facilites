import React from 'react';
import Navigation from '../../component/navigation_bar';
import {Table_list_organization} from '../../component/list_organization';
import {get_access_token} from '../../action/cookie.js';
import { Redirect } from 'react-router-dom';

export class Dashboard extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            auth: false
        }
    }
    componentWillMount() {
        this.access_token = get_access_token();
        if (get_access_token()) {
            this.setState({auth: true})
        } else {
            this.setState({auth: false})
        }
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
                        <h3>My Organizations</h3>
                        <Table_list_organization access_token={this.access_token}/>
                    </div>
                </div>
            </div>
        )
    }
}