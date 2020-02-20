import React from 'react';
import {connect} from 'react-redux';
import { 
    TableListOrganization,
    TableListOtherOrganization } from './list_organization';
import { 
    Grid, 
    Typography, 
    Paper } from '@material-ui/core';
import { GoToLogin } from '../../component/Redirect';
import { fetchProfile } from '../../action';
import { AddOrg } from '../../component/adding';
import styles from './organization.module.scss';

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
        }
    }
    componentDidMount() {
        this.props.dispatch(fetchProfile());
    }
    checkAuth() {
        if (this.state.auth === false) return <GoToLogin />
    }
    render() {
        return (
            <React.Fragment>
                {this.checkAuth()}
                <Grid container className={styles.bg}>
                    <Grid item xs={12} md={6} className={styles.item}>
                        <Paper className={styles.paper}>
                            <div className={styles.header_table}>
                                <Typography variant="h5">My Organizations</Typography>
                                <AddOrg />
                            </div>
                            <TableListOrganization />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} className={styles.item}>
                        <Paper className={styles.paper}>
                            <div className={styles.header_table}>
                                <Typography variant="h5">Other Organizations</Typography>
                            </div>
                            <TableListOtherOrganization />
                        </Paper>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps)(Dashboard);