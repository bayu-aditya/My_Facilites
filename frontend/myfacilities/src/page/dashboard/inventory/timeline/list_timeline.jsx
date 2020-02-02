import React from 'react';
import { Add_task } from '../../../../component/adding';
import Menu_row_task from '../../../../component/menu_list/menu_task';

class List_timeline extends React.Component {
    constructor(props) {
        super(props)
    }
    tabBody() {
        return (
            <tbody>
                {this.props.data.map(
                    function row(data, index) {
                        let id = data.id_task;
                        let username = data.username;
                        let start = data.start.split("T");
                        let start_date = start[0];
                        let start_time = start[1];
                        let finish = data.finish.split("T");
                        let finish_date = finish[0];
                        let finish_time = finish[1]
                        let note = data.note;
                        return (
                            <tr key={index} id={id}>
                                <td>{index + 1}</td>
                                <td>{username}</td>
                                <td>{start_date}</td>
                                <td>{start_time}</td>
                                <td>{finish_date}</td>
                                <td>{finish_time}</td>
                                <td>{note}</td>
                                <td className="auto-width">
                                    <Menu_row_task id_task={id} />
                                </td>
                            </tr>
                        )
                    }
                )}
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
                                <th rowSpan='2'>No.</th>
                                <th rowSpan='2'>Name</th>
                                <th colSpan='2'>Start</th>
                                <th colSpan='2'>Finish</th>
                                <th rowSpan='2'>Notes</th>
                                <th rowSpan='2'></th>
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

export default List_timeline;