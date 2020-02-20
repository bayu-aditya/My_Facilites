import React from 'react';
import { 
    AddInv, 
    AddInvMember } from '../../component/adding';
import ListInventory from './list_inventory';
import ListMember from './list_member';
import { connect } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { 
    IconButton, 
    Typography, 
    Grid, 
    Paper} from '@material-ui/core';
import {
    fetchOrganization, 
    fetchMemberOrganization } from '../../action';
import { 
    GoToLogin, 
    GoToDashboard } from '../../component/Redirect';
import { 
    ColorChooser,
    Information } from './component';
import styles from './inventory.module.scss';

function mapStateToProps(state) {
    return {
        auth: state.auth,
        username: state.profile.username,
        name: state.profile.name,
    }
}

function getColor(username, admin_resp, members_resp) {
    let color = null;
    admin_resp.forEach(
        (data) => {
            if (data["username"] === username){ color = data["color"] }
        }
    );
    members_resp.forEach(
        (data) => {
            if (data["username"] === username){ color = data["color"] }
        }
    );
    return color;
}

class Inventory extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            auth: this.props.auth,
            org_name: "Unknown",
            org_desc: "Unknown",
            org_load: true,
            admin: [],
            members: [],
            isLoadMember: true,
            currentColor: null,
        }
    }
    componentDidMount() {
        this.props.dispatch(fetchOrganization(this));
        this.props.dispatch(fetchMemberOrganization(this));
    }
    componentDidUpdate(prevProps, prevState) {
        let { username } = this.props;
        let { admin, members } = this.state;
        let color = getColor(username, admin, members);
        if (color !== prevState.currentColor) {
            this.setState({currentColor: color})
        }
    }
    checkAuth() {
        if (this.state.auth === false) return <GoToLogin />
    }
    backHandler = () => {
        GoToDashboard();
    }
    render() {
        return (
            <React.Fragment>
                {this.checkAuth()}
                <Grid container className={styles.bg}>
                    <Grid item xs={12} md={7} className={styles.item}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Information 
                                    name={this.state.org_name}
                                    desc={this.state.org_desc}
                                    isLoad={this.state.org_load}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Paper className={styles.paper}>
                                    <div className={styles.header_inv}>
                                        <div>
                                            <IconButton onClick={this.backHandler}>
                                                <ArrowBackIcon />
                                            </IconButton>
                                        </div>
                                        <div>
                                            <Typography variant="h5">My Inventory</Typography>
                                        </div>
                                        <div>
                                            <AddInv />
                                        </div>
                                    </div>
                                    <ListInventory />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={5} className={styles.item}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <ColorChooser 
                                    color={this.state.currentColor}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Paper className={styles.paper}>
                                    <div className={styles.header_member}>
                                        <div>
                                            <Typography variant="h5">People in this Organization</Typography>
                                        </div>
                                        <div>
                                            <AddInvMember />
                                        </div>
                                    </div>
                                    <ListMember 
                                        isLoad={this.state.isLoadMember}
                                        admin={this.state.admin}
                                        members={this.state.members}
                                    />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </React.Fragment>
        )   
    }
}

export default connect(mapStateToProps)(Inventory);