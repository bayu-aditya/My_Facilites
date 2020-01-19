import React from 'react';
import Navigation from '../../component/navigation_bar';
import {Table_list_organization} from '../../component/list_inventory';
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
        if (this.access_token != null) {
            this.setState({auth: true})
        }
    }
    goLogin() {
        if (this.state.auth === false) return <Redirect to="/" />
    }
    render() {
        return (
            <div>
                {this.goLogin()}
                <Navigation />
                <div className="row">
                    <div className="container-sm pt-3 mt-3 border col-sm-5">
                        <h3>List of Organizations</h3>
                        <Table_list_organization access_token={this.access_token}/>
                    </div>
                </div>
            </div>
        )
    }
}