import React from 'react';
import { 
    Table, 
    TableHead, 
    TableRow,
    TableCell, 
    TableBody} from '@material-ui/core';
import MenuRowTask from '../../component/menu_list/menu_task';
import styles from './timeline.module.scss';

class List_timeline extends React.Component {
    tabBody() {
        return (
            <TableBody>
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
                            <TableRow key={index} id={id} hover>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{username}</TableCell>
                                <TableCell>{start_date}</TableCell>
                                <TableCell>{start_time}</TableCell>
                                <TableCell>{finish_date}</TableCell>
                                <TableCell>{finish_time}</TableCell>
                                <TableCell>{note}</TableCell>
                                <TableCell className={styles.auto_width}>
                                    <MenuRowTask id_task={id} />
                                </TableCell>
                            </TableRow>
                        )
                    }
                )}
            </TableBody>
        )
    }
    render() {
        return (
            <div className={styles.table}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell rowSpan='2'>No.</TableCell>
                            <TableCell rowSpan='2'>Username</TableCell>
                            <TableCell colSpan='2'>Start</TableCell>
                            <TableCell colSpan='2'>Finish</TableCell>
                            <TableCell rowSpan='2'>Notes</TableCell>
                            <TableCell rowSpan='2'></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Time</TableCell>
                        </TableRow>
                    </TableHead>
                    {this.tabBody()}
                </Table>
            </div>
        )
    }
}

export default List_timeline;