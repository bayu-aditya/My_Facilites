import React from 'react';
import { 
    Paper, 
    TextField, 
    Button, 
    Grid, 
    Typography, 
    Divider} from '@material-ui/core';
import styles from './biodata.module.scss';

class BiodataPaper extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: null,
            name: null,
            email: null,
        }
    }
    updateProfileHandler = (e) => {
        e.preventDefault();
        console.log("update profile process");
        console.log(this.state);
    }
    changeHandler = (e) => {
        this.setState({[e.target.id]: e.target.value});
    }
    render() {
        return (
            <Paper className={styles.paper}>
                <Typography variant="h6">Profile</Typography>
                <Typography variant="body">Edit your information here.</Typography>
                <Divider />
                <form>
                    <Grid 
                        container 
                        className={styles.row_container} 
                        spacing={3}
                    >
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                id="username" 
                                onChange={this.changeHandler} 
                                value={this.state.username} 
                                variant="outlined" 
                                label="Username"
                                fullWidth 
                                required 
                                disabled 
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                id="name" 
                                onChange={this.changeHandler} 
                                value={this.state.name}
                                variant="outlined" 
                                label="Name" 
                                fullWidth
                                required 
                            />
                        </Grid>
                    </Grid>
                    <Grid 
                        container
                        className={styles.row_container}
                    >
                        <Grid item xs> 
                            <TextField 
                                id="email" 
                                onChange={this.changeHandler}
                                value={this.state.email} 
                                variant="outlined" 
                                label="E-mail" 
                                fullWidth
                                required 
                                disabled
                            />
                        </Grid>
                    </Grid>
                    <Grid 
                        container
                        className={styles.row_container}
                        justify="flex-end"
                    >
                        <Button 
                            onClick={this.updateProfileHandler}
                            variant="contained" 
                            color="primary"
                        >
                            Update Profile
                        </Button>
                    </Grid>
                </form>
            </Paper>
        )
    }
}

export default BiodataPaper;