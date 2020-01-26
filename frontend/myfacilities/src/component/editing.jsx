import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton, MenuItem } from '@material-ui/core';
import { DialogTitle, DialogContent, TextField, withStyles } from '@material-ui/core';

import { organization_api, inventory_api } from '../api/link.js';

const useStyles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 500
        }
    }
});

class Editing_org extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            id: null,
            name: null,
            desc: null
        };
        this.id_org = this.props.id_org;
        this.access_token = this.props.access_token;
        this.url = organization_api();
    }

    handleOpen = () => {
        this.setState({open: true})
    }
    handleClose = () => {
        this.setState({open: false})
    }
    changeHandler = (e) => {
        this.setState({[e.target.id]: e.target.value})
    }
    submitHandler = (e) => {
        e.preventDefault();
        console.log("submitted Form:");
        let url = this.url;
        let self = this;
        let body = {
            "_id": this.id_org,
            "name": this.state.name,
            "desc": this.state.desc
        }
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 202) {
                    let resp = JSON.parse(this.responseText);
                    console.log(resp);
                    self.handleClose();
                    window.location.reload();
                }
            }
        }
        xhr.open("PUT", url);
        xhr.setRequestHeader('Authorization', 'Bearer '+this.access_token);
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify(body))
    }
    dialogEdit() {
        const { classes } = this.props;
        return (
            <Dialog open={this.state.open} onClose={this.handleClose} className={classes.root}>
                <DialogTitle>Edit an Organization</DialogTitle>
                <DialogContent>
                    <form className={classes.root} autoComplete="off" onSubmit={this.submitHandler}>
                        <div>
                            <TextField id="name" label="name" variant="outlined" onChange={this.changeHandler} required/>
                        </div>
                        <div>
                            <TextField id="desc" label="desc" onChange={this.changeHandler}
                            multiline rows="5" variant="outlined" />
                        </div>
                        <Button type="submit">create</Button>
                    </form>
                </DialogContent>
            </Dialog>
        )
    }
    render() {
        return (
            <div>
                {this.dialogEdit()}
                <MenuItem onClick={this.handleOpen}>
                    <EditIcon fontSize="small" color="primary"/>
                    Edit
                </MenuItem>
            </div>
        )
    }
}

class Editing_inv extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            name: null,
            desc: null
        };
        this.id_org = this.props.id_org;
        this.id_inv = this.props.id_inv;
        this.access_token = this.props.access_token;
        this.url = inventory_api();
    }

    handleOpen = () => {
        this.setState({open: true})
    }
    handleClose = () => {
        this.setState({open: false})
    }
    changeHandler = (e) => {
        this.setState({[e.target.id]: e.target.value})
    }
    submitHandler = (e) => {
        e.preventDefault();
        console.log("submitted Form:");
        let url = this.url;
        let self = this;
        let body = {
            "_id_org": this.id_org,
            "_id": this.id_inv,
            "name": this.state.name
        }
        console.log(body);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 202) {
                    let resp = JSON.parse(this.responseText);
                    console.log(resp);
                    self.handleClose();
                    window.location.reload();
                }
            }
        }
        xhr.open("PUT", url);
        xhr.setRequestHeader('Authorization', 'Bearer '+this.access_token);
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify(body))
    }
    dialogEdit() {
        const { classes } = this.props;
        return (
            <Dialog open={this.state.open} onClose={this.handleClose} className={classes.root}>
                <DialogTitle>Edit an Organization</DialogTitle>
                <DialogContent>
                    <form className={classes.root} autoComplete="off" onSubmit={this.submitHandler}>
                        <div>
                            <TextField id="name" label="name" variant="outlined" onChange={this.changeHandler} required/>
                        </div>
                        <div>
                            <TextField id="desc" label="desc" onChange={this.changeHandler}
                            multiline rows="5" variant="outlined" />
                        </div>
                        <Button type="submit">create</Button>
                    </form>
                </DialogContent>
            </Dialog>
        )
    }
    render() {
        return (
            <div>
                {this.dialogEdit()}
                <MenuItem onClick={this.handleOpen}>
                    <EditIcon fontSize="small" color="primary"/>
                    Edit
                </MenuItem>
            </div>
        )
    }
}

const Edit_organization = withStyles(useStyles)(Editing_org);
const Edit_inventory = withStyles(useStyles)(Editing_inv);

export {Edit_organization, Edit_inventory};