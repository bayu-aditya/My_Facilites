import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';
import { DialogTitle, DialogContent, TextField, withStyles } from '@material-ui/core';

var url = "http://0.0.0.0:8888/organization";

const useStyles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 500
        }
    }
});

class Adding_org extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            unsubmit: false,
            user: null,
            name: null,
            desc: null
        };
    }

    handleOpen = () => {
        this.setState({open: true})
    }
    handleClose = () => {
        this.setState({open: false})
    }
    userHandler = (e) => {
        this.setState({user: e.target.value})
    }
    nameHandler = (e) => {
        this.setState({name: e.target.value})
    }
    descHandler = (e) => {
        this.setState({desc: e.target.value})
    }
    submitHandler = (event) => {
        event.preventDefault();
        console.log("submitted Form:");
        let values = {
            "admin": this.state.user,
            "name": this.state.name,
            "desc": this.state.desc
        }
        fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(values)
        })
        .then(res => res.json())
        .then(res => console.log(res));
        this.handleClose();
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button size="small" color="primary" variant="contained" aria-label="add" onClick={this.handleOpen} disableElevation>
                    <AddIcon />Adding
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} className={classes.root}>
                    <DialogTitle>Adding an Organization</DialogTitle>
                    <DialogContent>
                        <form className={classes.root} autoComplete="off" onSubmit={this.submitHandler}>
                            <div>
                                <TextField id="user" label="User" variant="outlined" onChange={this.userHandler} required/>
                            </div>
                            <div>
                                <TextField id="name" label="name" variant="outlined" onChange={this.nameHandler} required/>
                            </div>
                            <div>
                                <TextField id="desc" label="desc" onChange={this.descHandler}
                                multiline rows="5" variant="outlined" />
                            </div>
                            <Button type="submit" disabled={this.state.unsubmit}>create</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(useStyles)(Adding_org);