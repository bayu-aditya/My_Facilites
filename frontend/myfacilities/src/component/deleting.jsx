import React from 'react';
import { IconButton, MenuItem } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class Delete_organization extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialog: false,
        };
        this.id = this.props.id_org;
        this.name = this.props.name_org;
        this.access_token = this.props.access_token;
        this.url = "http://0.0.0.0:8888/organization";
    }
    openDeleteDialog = (e) => {
        this.setState({dialog: true})
    }
    deleteHandler = () => {
        let url = this.url;
        let self = this;
        let body = {"_id": this.id};
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 202) {
                let resp = JSON.parse(this.responseText);
                console.log(resp);
                self.closeDeleteDialog();
            }
        }
        xhr.open("DELETE", url);
        xhr.setRequestHeader("Authorization", "Bearer "+this.access_token);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(body))
        console.log(body)
        console.log(this.access_token)
    }
    closeDeleteDialog = () => {
        this.setState({dialog: false})
    }
    deleteDialog = () => (
        <div>
            <Dialog
            open={this.state.dialog}
            onClose={this.closeDeleteDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">Delete {this.name}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure want to delete this organization ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.closeDeleteDialog} color="primary">
                Disagree
                </Button>
                <Button onClick={this.deleteHandler} color="primary" autoFocus>
                Agree
                </Button>
            </DialogActions>
            </Dialog>
        </div>
    )
    render() {
        return (
            <div>
                {this.deleteDialog()}
                <MenuItem onClick={this.openDeleteDialog}>
                    <DeleteIcon fontSize="small"  color="secondary" />
                    Delete
                </MenuItem>
            </div>
        )
    }
}

class Delete_inventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialog: false
        };
        this.id_org = this.props.id_org;
        this.id_inv = this.props.id_inv;
        this.name_inv = this.props.name_inv;
        this.access_token = this.props.access_token;
        this.url = "http://0.0.0.0:8888/organization/inventory";
    }
    openDeleteDialog = (e) => {
        this.setState({dialog: true})
    }
    deleteHandler = () => {
        let url = this.url;
        let self = this;
        let body = {
            "_id_org": this.id_org,
            "_id": this.id_inv
        };
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 202) {
                let resp = JSON.parse(this.responseText);
                console.log(resp);
                self.closeDeleteDialog();
            }
        }
        xhr.open("DELETE", url);
        xhr.setRequestHeader("Authorization", "Bearer "+this.access_token);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(body))
        console.log(body)
        console.log(this.access_token)
    }
    closeDeleteDialog = () => {
        this.setState({dialog: false})
    }
    deleteDialog = () => (
        <div>
            <Dialog
            open={this.state.dialog}
            onClose={this.closeDeleteDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">Delete {this.name_inv}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure want to delete this inventory ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.closeDeleteDialog} color="primary">
                Disagree
                </Button>
                <Button onClick={this.deleteHandler} color="primary" autoFocus>
                Agree
                </Button>
            </DialogActions>
            </Dialog>
        </div>
    )
    render() {
        return (
            <div>
                {this.deleteDialog()}
                <MenuItem onClick={this.openDeleteDialog}>
                    <DeleteIcon fontSize="small" color="secondary" />
                    Delete
                </MenuItem>
            </div>
        )
    }
}

export {Delete_organization};
export {Delete_inventory};