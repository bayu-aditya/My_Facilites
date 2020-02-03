import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';
import { create_access_token, create_refresh_token, get_access_token } from '../../action/cookie.js';
import { login_api } from '../../api/link.js'

function mapStateToProps(state) {
    return {
        auth: state.auth,
    }
}

class Register extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     authenticate: this.props.auth,
        //     responseError: null,
        //     dialogOpen: false,
        //     username: null,
        //     password: null
        // }
        // console.log(this.state)
    }
    // changeHandle = (e) => {
    //     this.setState({[e.target.id]: e.target.value})
    // }
    // loginHandle = (e) => {
    //     e.preventDefault();
    //     var values = {
    //         "username": this.state.username,
    //         "password": this.state.password
    //     }
    // }
    // toDashboard = () => {
    //     if (this.state.authenticate || get_access_token()) {
    //         console.log("login successful, to dashboard")
    //         return <Redirect to="/dashboard" />
    //     }
    // }
    // authHandler = () => {
    //     this.props.dispatch({type: "LOGIN"});
    //     this.setState({authenticate: this.props.auth})
    // }
    // openDialog = () => {
    //     this.setState({dialogOpen: true})
    // }
    // closeDialog = () => {
    //     this.setState({dialogOpen: false})
    // }
    // dialogHandle = () => {
    //     return (
    //     <Dialog open={this.state.dialogOpen} onClose={this.closeDialog}>
    //         <DialogTitle>Authorization Failed!</DialogTitle>
    //         <DialogContent>
    //             <DialogContentText>
    //                 {this.state.responseError}
    //             </DialogContentText>
    //         </DialogContent>
    //     </Dialog>)
    // }
    render() {
        return (
            <div className="bg">
                {/* {this.toDashboard()} */}
                {/* {this.dialogHandle()} */}
                <div className="container-xl login">
                    <h4 className="header">Myfacilities Register</h4>
                    <div className="dropdown-divider"></div>
                    <form autoComplete="off" onSubmit={this.loginHandle}>
                        <div>
                            <input id="name" required className="form-control" placeholder="name" onChange={this.changeHandle}></input>
                        </div>
                        <div>
                            <input id="username" required className="form-control" placeholder="username" onChange={this.changeHandle}></input>
                        </div>
                        <div>
                            <input id="email" required className="form-control" placeholder="email" onChange={this.changeHandle}></input>
                        </div>
                        <div>
                            <input id="password" required type="password" className="form-control" placeholder="password" onChange={this.changeHandle}></input>
                        </div>
                        <div className="right">
                            <button type="submit" className="btn btn-primary">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Register);