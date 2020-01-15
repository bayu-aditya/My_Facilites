import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Adding_org from './adding_organization';
import {data} from '../action/get_organization.js';
import { IconButton } from '@material-ui/core';

export class Table_list_organization extends React.Component {
    constructor(props) {
        super(props)
        this.data = data["organization"]
    }
    selectHandler = (e) => {
        let idx = e.target.id;
        console.log("clicked ID: " + this.data[idx]["id"] + " Name: " + this.data[idx]["name"])
    }
    row(name, idx) {
        return (
            <tr key={idx}>
                <td id={idx} onClick={this.selectHandler}>
                    {name}
                </td>
                <td>
                    <IconButton aria-label="edit" color="primary">
                        <EditIcon fontSize="small"/>
                    </IconButton>
                    <IconButton aria-label="delete" color="secondary">
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
                <table id="tb_org" className="table table-hover">
                    <thead><tr><th>ID</th><th>Name</th><th></th></tr></thead>
                    <tbody>{this.data.map(
                        (org, index) => this.row(org["name"], index)
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}