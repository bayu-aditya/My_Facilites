import React from 'react';
import {hide_table, show_table} from './action.js';

export class Table_list_organization extends React.Component {
    row(user, name) {
        return (
            <tr>
                <td>{user}</td><td>{name}</td>
            </tr>
        )
    }
    button1() {
        return <button type="button" onClick={hide_table} className="btn btn-outline-danger">Hide</button>
    }
    button2() {
        return <button type="button" onClick={show_table} className="btn btn-outline-primary">Show</button>
    }
    render() {
        return (
            <div>
                <table id="tb_org" className="table table-hover">
                    <thead><tr><th>User</th><th>Name</th></tr></thead>
                    <tbody>{this.row("bayu_aditya", "Fakultas Ilmu Komputer")}</tbody>
                </table>
                {this.button2()}{this.button1()}
            </div>
        )
    }
}