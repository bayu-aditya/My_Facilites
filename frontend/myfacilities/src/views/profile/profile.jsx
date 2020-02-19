import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { GoToLogin } from '../../component/Redirect';
import { 
    AvatarPaper, 
    BiodataPaper } from './component';
import { fetchProfile } from '../../action';
import { user_api } from '../../api/link';
import styles from './profile.module.scss';

function mapStateToProps(state) {
    return {
        auth: state.auth,
    }
}

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.auth = this.props.auth;
        this.state = {
            name: null,
            username: null, 
            email: null,
        }
        this.url = user_api();
        this.props.dispatch(fetchProfile(this));
    }

    check_auth = () => {
        if (this.auth === false) return <GoToLogin />
    }
    render() {
        return (
            <div>
                {this.check_auth()}
                <Grid container className={styles.bg}>
                    <Grid item xs={12} md={5} className={styles.item}>
                        <AvatarPaper 
                            name={this.state.name}
                            username={this.state.username}
                            email={this.state.email}
                        />
                    </Grid>
                    <Grid item xs={12} md={7} className={styles.item}>
                        <BiodataPaper 
                            name={this.state.name}
                            username={this.state.username}
                            email={this.state.email}
                        />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

Profile.propTypes = {
    // from redux state
    auth: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(Profile);