import React from 'react';
import { Add_task, Add_inv } from '../../../../component/adding';

export class List_timeline extends React.Component {
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
                <Add_task />
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