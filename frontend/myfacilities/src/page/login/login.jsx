import React from 'react';
import {connect} from 'react-redux';
import { GoToRegister, GoToDashboard } from '../../component/redirect';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';
import { create_access_token, create_refresh_token, get_access_token } from '../../action/cookie.js';
import { login_api } from '../../api/link.js'
import styles from './login.module.scss';

function mapStateToProps(state) {
    return {
        auth: state.auth,
    }
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticate: this.props.auth,
            responseError: null,
            dialogOpen: false,
            username: null,
            password: null,
        }
        console.log(this.state)
    }
    changeHandle = (e) => {
        this.setState({[e.target.id]: e.target.value})
    }
    loginHandle = (e) => {
        e.preventDefault();
        var values = {
            "username": this.state.username,
            "password": this.state.password
        }
        console.log(values)
        this.setState({auth: true})
        var self = this;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            console.log("waiting ...")
            if (this.readyState === 4) {
                // success
                if (this.status === 202) {
                    let resp = JSON.parse(this.responseText);
                    create_access_token(resp);
                    create_refresh_token(resp);
                    self.authHandler();
                }
                // wrong username
                else if (this.status === 401) {
                    let resp = JSON.parse(this.responseText);
                    self.setState({responseError: resp["message"]})
                    self.openDialog();
                }
                // username not found
                else if (this.status === 404) {
                    let resp = JSON.parse(this.responseText);
                    self.setState({responseError: resp["message"]})
                    self.openDialog();
                // something wrong in server
                } else {
                    console.log("server error")
                }
            }}
        xhttp.open("POST", login_api());
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(values));
    }
    componentDidMount() {
        if (this.state.authenticate) {
            console.log("login successful, to dashboard")
            GoToDashboard()
        }
    }
    registerHandler = () => {
        GoToRegister();
    }
    authHandler = () => {
        this.props.dispatch({type: "LOGIN"});
        this.setState({authenticate: this.props.auth});
        GoToDashboard();
    }
    openDialog = () => {
        this.setState({dialogOpen: true})
    }
    closeDialog = () => {
        this.setState({dialogOpen: false})
    }
    dialogHandle = () => {
        return (
        <Dialog open={this.state.dialogOpen} onClose={this.closeDialog}>
            <DialogTitle>Authorization Failed!</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {this.state.responseError}
                </DialogContentText>
            </DialogContent>
        </Dialog>)
    }
    render() {
        return (
            <div className={styles.bg}>
                {this.dialogHandle()}
                <div className={styles.half_left}>
                    <div className={styles.quotes}>
                        <div>
                            <h3>Welcome Back !</h3>
                        </div>
                        <div>
                            <span>
                                Enter your personal details and start journey with us   
                            </span>
                        </div>
                        <div>
                            <button onClick={this.registerHandler}><span>Sign Up </span></button>
                        </div>
                    </div>
                </div>
                <div className={styles.half_right}>
                    <div className={styles.login}>
                        <h3>Sign In to MyFacilities</h3>
                        <div className="dropdown-divider"></div>
                        <form autoComplete="off" onSubmit={this.loginHandle}>
                            <div className={styles.input}>
                                <input id="username" required className="form-control" placeholder="username" onChange={this.changeHandle}></input>
                            </div>
                            <div className={styles.input}>
                                <input id="password" required type="password" className="form-control" placeholder="password" onChange={this.changeHandle}></input>
                            </div>
                            <div className={styles.input}>
                                <button type="submit" className="btn btn-primary btn-block">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Login);