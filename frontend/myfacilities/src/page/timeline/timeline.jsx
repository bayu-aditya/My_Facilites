import React from 'react';
import { connect } from 'react-redux';
import Navigation from '../../component/navigation/navigation_bar';
import { GoToLogin } from '../../component/redirect';
import { Add_task } from '../../component/adding';
import Graph_Timeline_Apex from './graph_timeline_apex';
import List_timeline from './list_timeline';
import { fetchTasks } from '../../action';
import { tasks_api } from '../../api/link';
import styles from './timeline.module.scss';
import { Typography, Grid } from '@material-ui/core';

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
                <Grid container spacing={5} justify="center" className={styles.bg}>
                    <Grid item xs={12} sm={10}>
                        <div className={styles.paper}>
                        {(this.state.data.length === 0) ?
                            <h5>The timeline is not displayed because the data is empty.</h5> : 
                            <Graph_Timeline_Apex data={this.state.data} />
                        }
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <div className={styles.paper}>
                            <div className={styles.header_member}>
                                <div>
                                    <Typography variant="h5"><b>Tasks</b></Typography>
                                </div>
                                <div>
                                    <Add_task />
                                </div>
                            </div>
                            {(this.state.data.length === 0) ?
                            <h5>Task is empty.</h5> : 
                            <List_timeline data={this.state.data} />
                            }
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Timeline);