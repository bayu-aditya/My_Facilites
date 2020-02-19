import React from 'react';
import { 
    Table, 
    TableHead, 
    TableRow,
    TableCell,
    TableBody} from '@material-ui/core';
import MenuRowInv from '../../component/menu_list/menu_inventory';
import Loading from '../../component/loading';
import { connect } from 'react-redux';

import { inventories_api } from '../../api/link.js';
import { GoToTimeline } from '../../component/Redirect';
import { fetchInventories, setIdInv } from '../../action';
import styles from './inventory.module.scss';

function mapStateToProp(state) {
    return {
        id_org: state.id_org,
    }
}

class ListInventory extends React.Component {
    constructor(props) {
        super(props);
        this.id_org = this.props.id_org;
        this.url = inventories_api();
        this.state = {
            isLoad: true,
            inventory: []
        }
    }
    componentDidMount() {
        this.props.dispatch(fetchInventories(this));
    }
    selectHandler = (e) => {
        console.log(e.target.parentNode.id);
        this.props.dispatch(setIdInv(e.target.parentNode.id));
        setTimeout(() => GoToTimeline(), 100);
    }
    tabBody = () => {
        let self = this;
        if (this.state.inventory.length === 0) {
            return <span>Inventory is empty.</span>
        } else {
            return (
                <TableBody>
                    {this.state.inventory.map(
                        function row(data, index) {
                            let id = data["_id"];
                            let name = data["name"];
                            return (
                                <TableRow key={index} id={id} hover>
                                    <TableCell onClick={self.selectHandler}>{name}</TableCell>
                                    <TableCell className={styles.auto_width}>
                                        <MenuRowInv 
                                        id_org={self.id_org}
                                        id_inv={id}
                                        name_inv={name} />
                                    </TableCell>
                                </TableRow>    
                            )
                        }
                    )}
                </TableBody>
            )
        }
    }
    render() {
        if (this.state.isLoad === true) {
            return <Loading />
        } else {
            return (
                <React.Fragment>
                    <div className={styles.table}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name Inventory</TableCell>
                                <TableCell padding="checkbox" />
                            </TableRow>
                        </TableHead>
                        {this.tabBody()}
                    </Table>
                    </div>
                </React.Fragment>
            )
        }
    }
}

export default connect(mapStateToProp)(ListInventory);