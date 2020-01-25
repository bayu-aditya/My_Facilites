import React from 'react';
import { Redirect } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';
import './login.scss';
import { create_access_token, create_refresh_token, get_access_token } from '../../action/cookie.js';

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticate: false,
            responseError: null,
            dialogOpen: false,
            username: null,
            password: null
        }
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
        xhttp.open("POST", "http://0.0.0.0:8888/login");
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(values));
    }
    toDashboard = () => {
        // if (this.state.authenticate || get_access_token()) {
        if (this.state.authenticate) {
            console.log("login successful, to dashboard")
            return <Redirect to="/dashboard" />
        }
    }
    authHandler = () => {
        this.setState({authenticate: true})
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
            <div className="bg">
                {this.toDashboard()}
                {this.dialogHandle()}
                <div className="container-xl login">
                    <h4 className="header">Myfacilities Login</h4>
                    <div className="dropdown-divider"></div>
                    <form autoComplete="off" onSubmit={this.loginHandle}>
                        <div>
                            <input id="username" required className="form-control" placeholder="username" onChange={this.changeHandle}></input>
                        </div>
                        <div>
                            <input id="password" required type="password" className="form-control" placeholder="password" onChange={this.changeHandle}></input>
                        </div>
                        <div className="right">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}