import React from 'react';
import {connect} from 'react-redux';
import Navigation from '../../component/navigation_bar';
import Table_list_organization_new from './list_organization';

import { GoToLogin } from '../../component/redirect';
import { auth_check, refresh_token } from '../../action/auth.js';
import { get_access_token } from '../../action/cookie.js';
import { settingName, fetchName } from '../../action';
import { user_api } from '../../api/link.js';

function mapStateToProps(state) {
    return {
        auth: state.auth,
        access_token: state.access_token,
        refresh_token: state.refresh_token,
        name: state.name
    }
}

class Dashboard extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            auth: this.props.auth,
            user: this.props.name,
            access_token: this.props.access_token
        }
    }
    componentDidMount() {
        this.props.dispatch(fetchName());
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
                        <Table_list_organization_new />
                    </div>
                    <div className="container-sm pt-3 mt-3 border col-sm-3">
                        <h5>Hello {this.props.name} !</h5>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Dashboard);