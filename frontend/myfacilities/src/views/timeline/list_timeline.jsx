import React from 'react';
import { 
    Table, 
    TableHead, 
    TableRow,
    TableCell, 
    TableBody} from '@material-ui/core';
import MenuRowTask from '../../component/menu_list/menu_task';
import styles from './timeline.module.scss';

class ListTimeline extends React.Component {
    tabBody() {
        return (
            <TableBody>
                {this.props.data.map(
                    function row(data, index) {
                        let id = data.id_task;
                        let name = data.name;
                        let start = new Date(data.start);
                        let start_time = start.toString().slice(0,24);
                        let finish = new Date(data.finish);
                        let finish_time = finish.toString().slice(0,24);
                        let note = (data.note) ? data.note : "-";
                        return (
                            <TableRow key={index} id={id} hover>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{name}</TableCell>
                                <TableCell>{start_time}</TableCell>
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
                            <TableCell>No.</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Start</TableCell>
                            <TableCell>Finish</TableCell>
                            <TableCell>Notes</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    {this.tabBody()}
                </Table>
            </div>
        )
    }
}

export default ListTimeline;