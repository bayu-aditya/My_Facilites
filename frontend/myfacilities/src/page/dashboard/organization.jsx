import React from 'react';
import {connect} from 'react-redux';
import Navigation from '../../component/navigation_bar';
import { 
    TableListOrganization,
    TableListOtherOrganization } from './list_organization';

import { GoToLogin } from '../../component/redirect';
import { fetchName } from '../../action';

function mapStateToProps(state) {
    return {
        auth: state.auth,
        name: state.name
    }
}

class Dashboard extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            auth: this.props.auth,
            user: this.props.name,
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
                    <div className="container-sm pt-3 mt-3 border col-sm-3">
                        <h5>Hello {this.props.name} !</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="container-sm pt-3 mt-3 border col-sm-5">
                        <h3>My Organizations</h3>
                        <TableListOrganization />
                    </div>
                    <div className="container-sm pt-3 mt-3 border col-sm-5">
                        <h3>Other Organizations</h3>
                        <TableListOtherOrganization />
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Dashboard);