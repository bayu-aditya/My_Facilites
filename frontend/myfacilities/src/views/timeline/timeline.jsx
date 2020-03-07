import React from 'react';
import { connect } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { 
    Typography, 
    Grid, 
    IconButton, 
    Paper } from '@material-ui/core';
import { GoToLogin } from '../../component/redirect';
import { GoToInventory } from '../../component/Redirect';
import { Add_task } from '../../component/adding';
import { GraphTimeline } from './component';
import ListTimeline from './list_timeline';
import { 
    fetchTasks,
    fetchMemberOrganization } from '../../action';
import { tasks_api } from '../../api/link';
import styles from './timeline.module.scss';

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
            admin: [],
            members: [],
        }
        this.id_org = this.props.id_org;
        this.id_inv = this.props.id_inv;
        this.url = tasks_api();
    }
    componentDidMount() {
        this.props.dispatch(fetchTasks(this));
        this.props.dispatch(fetchMemberOrganization(this));
    }
    backHandler = () => {
        GoToInventory();
    }
    checkAuth() {
        if (this.state.auth === false) return <GoToLogin />
    }
    render() {
        return (
            <div>
                {this.checkAuth()}
                <Grid container justify="center" className={styles.bg}>
                    <Grid item xs={12} lg={10} className={styles.item}>
                        <Paper className={styles.paper}>
                        {(this.state.data.length === 0) ?
                            <h5>The timeline is not displayed because the data is empty.</h5> : 
                            <GraphTimeline 
                                data={this.state.data}
                                admin={this.state.admin}
                                members={this.state.members}  
                            />
                        }
                        </Paper>
                    </Grid>
                    <Grid item xs={12} lg={10} className={styles.item}>
                        <Paper className={styles.paper}>
                            <div className={styles.header_member}>
                                <div>
                                    <IconButton onClick={this.backHandler}>
                                        <ArrowBackIcon />
                                    </IconButton>
                                </div>
                                <div>
                                    <Typography variant="h5"><b>Tasks</b></Typography>
                                </div>
                                <div>
                                    <Add_task />
                                </div>
                            </div>
                            {(this.state.data.length === 0) ?
                            <h5>Task is empty.</h5> : 
                            <ListTimeline data={this.state.data}/>
                            }
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Timeline);