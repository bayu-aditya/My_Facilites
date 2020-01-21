import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';
import Adding_org from './adding_organization';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { create_cookie } from '../action/cookie.js';

export class Table_list_organization extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            access_token: this.props.access_token,
            error: null,
            isLoaded: false,
            data: []
        }
    }

    componentDidMount() {
        var urls = "http://0.0.0.0:8888/organizations";
        fetch(urls, {
            method: "GET",
            headers: {"Authorization": "Bearer "+this.state.access_token},
        })
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    data: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    render() {
        const {error, isLoaded, data} = this.state;
        if (isLoaded) {
            if (error) {
                return <div>Something Wrong in Server: {error.message}</div>
            }
            else {
                return <List_organization data={data} />
            }
        }
        else {
            return <div>Connecting to Database ...</div>
        }
    }
}


class List_organization extends React.Component {
    constructor(props) {
        super(props)
        this.data = this.props.data["organization"]
        this.state = {
            admin: null,
            del_state: false,
            del_id: null,
            del_name: null
        }
    }
    // ====================== SELECT SECTION ================================
    selectHandler = (e) => {
        let idx = e.target.id;
        let _id = this.data[idx]["_id"];
        let name = this.data[idx]["name"];
        // console.log("clicked ID: " + _id + " Name: " + name)
        create_cookie("_id_org", _id);
        window.location = "/dashboard/inventory"
    }
    // ====================== EDIT SECTION ==================================
    editHandler = (e) => {
        let idx = e.target.closest("td").id;
        console.log("edited ID: " + this.data[idx]["_id"] + " Name: " + this.data[idx]["name"])
    }
    // ==================== DELETE SECTION ==================================
    deleteHandler = (e) => {
        let idx = e.target.closest("td").id;
        this.setState({
            del_id: this.data[idx]["_id"],
            del_name: this.data[idx]["name"]
        })
        this.openDeleteDialog();
    }
    openDeleteDialog = () => {
        this.setState({del_state: true})
    }
    closeDeleteDialog = () => {
        this.setState({del_state: false})
    }
    deleteProcess = () => {
        var url = "http://0.0.0.0:8888/organization";
        console.log("deleted ID: " + this.state.del_id + " Name: " + this.state.del_name);
        let values = {
            "admin": this.state.admin,
            "_id": this.state.del_id
        }
        fetch(url, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(values)
        })
        .then(res => res.json())
        .then(res => console.log(res))
        this.closeDeleteDialog();
    }
    deleteDialog = () => (
        <div>
            <Dialog
            open={this.state.del_state}
            onClose={this.closeDeleteDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"Delete " + this.state.del_name + " Organization"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure want to delete this organization ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.closeDeleteDialog} color="primary">
                Disagree
                </Button>
                <Button onClick={this.deleteProcess} color="primary" autoFocus>
                Agree
                </Button>
            </DialogActions>
            </Dialog>
        </div>
        );
    // ======================================================================
    row(name, idx) {
        return (
            <tr key={idx}>
                <td id={idx} onClick={this.selectHandler}>
                    {name}
                </td>
                <td id={idx}>
                    <IconButton aria-label="edit" color="primary" onClick={this.editHandler}>
                        <EditIcon fontSize="small"/>
                    </IconButton>
                    <IconButton aria-label="delete" color="secondary" onClick={this.deleteHandler}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </td>
            </tr>
        )
    }
    render() {
        return (
            <div>
                <Adding_org />
                {this.deleteDialog()}
                <table id="tb_org" className="table table-hover">
                    <thead><tr><th>Name</th><th></th></tr></thead>
                    <tbody>{this.data.map(
                        (org, index) => this.row(org["name"], index)
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}