import React from 'react';
import { connect } from 'react-redux';
import styles from './register.module.scss';

function mapStateToProps(state) {
    return {
        auth: state.auth,
    }
}

class Register extends React.Component {
    constructor(props) {
        super(props);
    }
    loginHandler() {
        window.location.href = "/"
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
                        <h3>Sign Up to Myfacilities</h3>
                        <div className="dropdown-divider"></div>
                        <form autoComplete="off" onSubmit={this.registerHandle}>
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