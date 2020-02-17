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
    Grid } from '@material-ui/core';
import { fetchName } from '../../action';
import { 
    GoToLogin, 
    GoToDashboard } from '../../component/Redirect';
import { ColorChooser } from './component';
import styles from './inventory.module.scss';

function mapStateToProps(state) {
    return {
        auth: state.auth,
        name: state.name,
    }
}

class Inventory extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            auth: this.props.auth,
        }
        console.log(this.state)
    }
    componentDidMount() {
        this.props.dispatch(fetchName());
    }
    checkAuth() {
        if (this.state.auth === false) return <GoToLogin />
    }
    backHandler = () => {
        GoToDashboard();
    }
    render() {
        return (
            <div>
                {this.checkAuth()}
                <Grid container spacing={5} className={styles.bg}>
                    <Grid item xs={12} md={7}>
                        <div className={styles.paper}>
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
                        </div>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <ColorChooser />
                            </Grid>
                            <Grid item xs={12}>
                                <div className={styles.paper}>
                                    <div className={styles.header_member}>
                                        <div>
                                            <Typography variant="h5">People in this Organization</Typography>
                                        </div>
                                        <div>
                                            <AddInvMember />
                                        </div>
                                    </div>
                                    <ListMember />
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )   
    }
}

export default connect(mapStateToProps)(Inventory);