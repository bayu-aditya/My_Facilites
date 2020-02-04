import React from 'react';
import { connect } from 'react-redux';
import Navigation from '../../../../component/navigation/navigation_bar';
import { GoToLogin } from '../../../../component/redirect';
import { Graph_Timeline } from './graph_timeline';
import List_timeline from './list_timeline';
import { fetchTasks } from '../../../../action';
import { tasks_api } from '../../../../api/link';

function mapStateToProps(state) {
    return {
        auth: state.auth,
        id_org: state.id_org,
        id_inv: state.id_inv,
        username: state.name,
    }
}

class Timeline extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            auth: this.props.auth,
            data: [],
        }
        this.id_org = this.props.id_org;
        this.id_inv = this.props.id_inv;
        this.url = tasks_api();
    }
    componentDidMount() {
        this.props.dispatch(fetchTasks(this));
    }
    checkAuth() {
        if (this.state.auth === false) return <GoToLogin />
    }
    render() {
        return (
            <div>
                {this.checkAuth()}
                <Navigation />
                <div className="container-sm pt-3 mt-3 border col-sm-10">
                    <Graph_Timeline data={this.state.data} />
                </div>
                <div className="container-sm pt-3 mt-3 border col-sm-10">
                    <h3>Tasks</h3>
                    <List_timeline data={this.state.data} />
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Timeline);