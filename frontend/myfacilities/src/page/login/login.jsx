import React from 'react';
import { Grid, TextField, Button, Container, Box } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import './login.scss';

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
            username: null,
            password: null
        }
    }
    changeHandle = (e) => {
        this.setState({[e.target.id]: e.target.value})
    }
    loginHandle = (e) => {
        e.preventDefault();
        console.log(this.state)
    }
    render() {
        return (
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
        )
    }
}