import React from 'react';
import { Grid, TextField, Button, Container, Box } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import './login.scss';
import { Redirect } from 'react-router-dom';

// const useStyle = makeStyles(theme => ({
//     margin: {
//         margin: theme.spacing(3)
//     }
// }));
const defaultProps = {
    bgcolor: 'background.paper',
    border: 3,
    m: 1,
    borderColor: 'text.primary',
  };

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: false,
            username: null,
            password: null
        }
    }
    changeHandle = (e) => {
        this.setState({[e.target.id]: e.target.value})
    }
    loginHandle = (e) => {
        e.preventDefault();
        // console.log(this.state)
        let values = {
            "username": this.state.username,
            "password": this.state.password
        }
        fetch("http://0.0.0.0:8888/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(values)
        })
        .then((response) => {
            if (response.status >= 200 && response.status <= 299) {
                return response.json()
            } else {
                throw Error(response.statusText);
            }
        })
        .then((jsonResponse) => {
            document.cookie = "access_token=" + jsonResponse["access_token"]
            this.setState({auth: true})
        }).catch((error) => {
            console.log("error: " + error);
        });
    }
    toDashboard = () => {
        if (this.state.auth) {
            return <Redirect to="/dashboard" />
        }
    }
    render() {
        return (
            <div>
                {this.toDashboard()}
                <Container maxWidth="xs">
                    <Box border={0} {...defaultProps}>
                        <h3>Myfacilities Login</h3>
                        <form autoComplete="off" onSubmit={this.loginHandle}>
                            <div>
                                <Grid container spacing={1} alignItems="flex-end">
                                    <Grid item>
                                        <AccountCircle />
                                    </Grid>
                                    <Grid item>
                                        <TextField required id="username" label="username" onChange={this.changeHandle}/>
                                    </Grid>
                                </Grid>
                            </div>
                            <div>
                                <Grid container spacing={1} alignItems="flex-end">
                                    <Grid item>
                                        <LockIcon />
                                    </Grid>
                                    <Grid item>
                                        <TextField required id="password" label="password" type="password" onChange={this.changeHandle}/>
                                    </Grid>
                                </Grid>
                            </div>
                            <Button type="submit">Login</Button>
                        </form>
                    </Box>
                </Container>
            </div>
        )
    }
}