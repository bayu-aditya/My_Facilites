import React from 'react';
import { Add_inv, Add_inv_member } from '../../component/adding';
import Navigation from '../../component/navigation/navigation_bar';
import List_Inventory from './list_inventory';
import List_Member from './list_member';
import { GoToLogin } from '../../component/redirect';
import { connect } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconButton, Typography, Grid } from '@material-ui/core';
import { fetchName } from '../../action';
import { GoToDashboard } from '../../component/redirect';
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
                <Navigation />
                <Grid container spacing={5} className={styles.bg}>
                    <Grid item xs={12} sm={7}>
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
                                    <Add_inv />
                                </div>
                            </div>
                            <List_Inventory />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <div className={styles.paper}>
                            <div className={styles.header_member}>
                                <div>
                                    <Typography variant="h5">People in this Organization</Typography>
                                </div>
                                <div>
                                    <Add_inv_member />
                                </div>
                            </div>
                            <List_Member />
                        </div>
                    </Grid>
                </Grid>
            </div>
        )   
    }
}

export default connect(mapStateToProps)(Inventory);