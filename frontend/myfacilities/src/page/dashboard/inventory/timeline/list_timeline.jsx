import React from 'react';
import { Add_task, Add_inv } from '../../../../component/adding';

function retrieveAPI(that) {

}

export class List_timeline extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id_org: this.props.id_org,
            id_inv: this.props.id_inv,
            username: this.props.username
        }
    }
    componentDidUpdate() {
        console.log(this.state.username)
    }
    tabBody() {
        return (
            <tbody>
                <tr>
                    <td>bayu_aditya</td>
                    <td>12 Januari 2019</td>
                    <td>10:20</td>
                    <td>13 Januari 2019</td>
                    <td>00:20</td>
                    <td>Some Notes</td>
                </tr>
            </tbody>
        )
    }
    render() {
        return (
            <div>
                <Add_task 
                    id_org={this.state.id_org}
                    id_inv={this.state.id_inv}
                    username={this.state.username}
                />
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th rowSpan='2'>Name</th>
                                <th colSpan='2'>Start</th>
                                <th colSpan='2'>Finish</th>
                                <th rowSpan='2'>Notes</th>
                            </tr>
                            <tr>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Date</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        {this.tabBody()}
                    </table>
                </div>
            </div>
        )
    }
}