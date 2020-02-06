import React from 'react';
import { connect } from 'react-redux';
import { register_api } from '../../api/link';
import styles from './register.module.scss';

function mapStateToProps(state) {
    return {
        auth: state.auth,
    }
}

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            username: null,
            email: null,
            password: null,
            re_password: null,
        }
    }
    changeHandler = (e) => {
        this.setState({[e.target.id]: e.target.value});
    }
    loginHandler() {
        window.location.href = "/"
    }
    registerHandler = (e) => {
        e.preventDefault();
        let body = {
            "name": this.state.name,
            "username": this.state.username,
            "email": this.state.email,
            "password": this.state.password,
        };
        if (this.state.password !== this.state.re_password) {
            alert("Retype password didn't match."); 
        } else {
            console.log("register process");
            fetch(register_api(), {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body),
            })
            .then((res) => {
                if (res.status === 202) {
                    let json = res.json();
                    alert(json["message"]);
                }
            })
            .catch(error => console.log(error));
        }
    }
    render() {
        return (
            <div className={styles.bg}>
                <div className={styles.half_left}>
                    <div className={styles.quotes}>
                        <div>
                            <h3>Join Us !</h3>
                        </div>
                        <div>
                            <span>
                                Enter your personal details and start journey with us   
                            </span>
                        </div>
                        <div>
                            <button onClick={this.loginHandler}><span>Sign In </span></button>
                        </div>
                    </div>
                </div>
                <div className={styles.half_right}>
                    <div className={styles.login}>
                        <h3>Sign Up to MyFacilities</h3>
                        <div className="dropdown-divider"></div>
                        <form autoComplete="off" onSubmit={this.registerHandler}>
                            <div>
                                <input id="name" required className="form-control" placeholder="Your Name" onChange={this.changeHandler}></input>
                            </div>
                            <div>
                                <input id="username" required className="form-control" placeholder="Username" onChange={this.changeHandler}></input>
                            </div>
                            <div>
                                <input id="email" required type="email" className="form-control" placeholder="E-mail" onChange={this.changeHandler}></input>
                            </div>
                            <div>
                                <input id="password" required type="password" className="form-control" placeholder="Password" onChange={this.changeHandler}></input>
                            </div>
                            <div>
                                <input id="re_password" required type="password" className="form-control" placeholder="Retype Password" onChange={this.changeHandler}></input>
                            </div>
                            <div className="right">
                                <button type="submit" className="btn btn-primary btn-block">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Register);