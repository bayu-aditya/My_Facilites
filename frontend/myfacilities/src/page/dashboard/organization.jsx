import React from 'react';
import {connect} from 'react-redux';
import Navigation from '../../component/navigation/navigation_bar';
import { 
    TableListOrganization,
    TableListOtherOrganization } from './list_organization';
import { Grid, Typography } from '@material-ui/core';
import { GoToLogin } from '../../component/redirect';
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
                <Navigation />
                <Grid container spacing={5} className={styles.bg}>
                    <Grid item xs={12} sm={6}>
                        <div className={styles.paper}>
                            <div className={styles.header_table}>
                                <div>
                                    <Typography variant="h5">My Organizations</Typography>
                                </div>
                                <div>
                                    <Add_org />
                                </div>
                            </div>
                            <TableListOrganization />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className={styles.paper}>
                            <div className={styles.header_table}>
                                <Typography variant="h5">Other Organizations</Typography>
                            </div>
                            <TableListOtherOrganization />
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Dashboard);