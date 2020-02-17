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
import { fetchName } from '../../action';
import { Add_org } from '../../component/adding';
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
                <Grid container className={styles.bg}>
                    <Grid item xs={12} md={6} className={styles.item}>
                        <Paper className={styles.paper}>
                            <div className={styles.header_table}>
                                <div>
                                    <Typography variant="h5">My Organizations</Typography>
                                </div>
                                <div>
                                    <Add_org />
                                </div>
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
            </div>
        )
    }
}

export default connect(mapStateToProps)(Dashboard);