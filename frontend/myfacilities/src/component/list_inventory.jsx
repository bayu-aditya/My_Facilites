import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Adding_org from './adding_organization';
import { IconButton } from '@material-ui/core';

var admin = "bayu_aditya";
var API = "http://0.0.0.0:8888/organizations";
var url = API + "?admin=" + admin;

export class Table_list_organization extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            data: []
        }
    }

    componentDidMount() {
        fetch(url)
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
            return <div>Loading...</div>
        }
    }
}


class List_organization extends React.Component {
    constructor(props) {
        super(props)
        this.data = this.props.data["organization"]
    }
    selectHandler = (e) => {
        let idx = e.target.id;
        console.log("clicked ID: " + this.data[idx]["_id"] + " Name: " + this.data[idx]["name"])
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