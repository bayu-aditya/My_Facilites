import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { GoToLogin } from '../../component/Redirect';
import { 
    AvatarPaper, 
    BiodataPaper } from './component';
import styles from './profile.module.scss';

function mapStateToProps(state) {
    return {
        auth: state.auth,
    }
}

function Profile(props) {
    const { auth } = props;

    const check_auth = () => {
        if (auth === false) return <GoToLogin />
    }

    return (
        <div>
            {check_auth()}
            <Grid container className={styles.bg}>
                <Grid item xs={12} md={5} className={styles.item}>
                    <AvatarPaper />
                </Grid>
                <Grid item xs={12} md={7} className={styles.item}>
                    <BiodataPaper />
                </Grid>
            </Grid>
        </div>
    )
}

Profile.propTypes = {
    // from redux state
    auth: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(Profile);