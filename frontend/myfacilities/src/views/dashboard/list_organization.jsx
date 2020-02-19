import React from 'react';
import { connect } from 'react-redux';
import { 
    Table, 
    TableHead, 
    TableRow, 
    TableCell,
    TableBody } from '@material-ui/core';
import Loading from '../../component/loading';
import MenuRowOrg from '../../component/menu_list/menu_organization';
import { 
    organizations_api, 
    other_organizations_api } from '../../api/link.js';
import { 
    fetchOrganizations, 
    fetchOtherOrganizations } from '../../action';
import { setIdOrg } from '../../action';
import { GoToInventory } from '../../component/Redirect';
import styles from './organization.module.scss';

class Table_list_organization extends React.Component {
    constructor(props) {
        super(props);
        this.url = organizations_api();
        this.state = {
            isLoad: true,
            organization: [],
        }
        let self = this;
        this.props.dispatch(fetchOrganizations(self));
    }
    selectHandler = (e) => {
        console.log(e.target.parentNode.id);
        this.props.dispatch(setIdOrg(e.target.parentNode.id))
        GoToInventory();
    }
    tabBody() {
        let self = this;
        return (
            <TableBody>
                {this.state.organization.map(
                    function row(data, index) {
                        let id = data["_id"];
                        let name = data["name"];
                        let num_inv = data["num_inv"];
                        let num_mem = data["num_mem"];
                        return (
                            <TableRow key={index} id={id} hover>
                                <TableCell onClick={self.selectHandler}>{name}</TableCell>
                                <TableCell onClick={self.selectHandler} className={styles.auto_width}>{num_inv}</TableCell>
                                <TableCell onClick={self.selectHandler} className={styles.auto_width}>{num_mem}</TableCell>
                                <TableCell >
                                    <MenuRowOrg
                                        id_org={id}
                                        name_org={name}
                                    />
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
            <React.Fragment>
                {(this.state.isLoad === true) ? <Loading /> : 
                <div className={styles.table}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Inventory</TableCell>
                                <TableCell>Member</TableCell>
                                <TableCell padding="checkbox" />
                            </TableRow>
                        </TableHead>
                        {this.tabBody()}
                    </Table>
                </div>
                }
            </React.Fragment>
        )
    }
}

class Table_list_other_organization extends React.Component {
    constructor(props) {
        super(props);
        this.url = other_organizations_api();
        this.state = {
            isLoad: true,
            organization: [],
        }
    }
    componentDidMount() {
        let self = this;
        this.props.dispatch(fetchOtherOrganizations(self));
    }
    selectHandler = (e) => {
        console.log(e.target.parentNode.id);
        this.props.dispatch(setIdOrg(e.target.parentNode.id))
        GoToInventory();
    }
    tabBody = () => {
        let self = this;
        return (
            <TableBody>
                {this.state.organization.map(
                    function row(data, index) {
                        let id = data["_id"];
                        let name = data["name"];
                        let num_inv = data["num_inv"];
                        let num_mem = data["num_mem"];
                        return (
                            <TableRow key={index} id={id} hover>
                                <TableCell onClick={self.selectHandler}>{name}</TableCell>
                                <TableCell onClick={self.selectHandler} className={styles.auto_width}>{num_inv}</TableCell>
                                <TableCell onClick={self.selectHandler} className={styles.auto_width}>{num_mem}</TableCell>
                            </TableRow>    
                        )
                    }
                )}
            </TableBody>
        )
    }
    render() {
        if (this.state.isLoad === true) {
            return <Loading />
        } else {
            return (
                <React.Fragment>
                    {(this.state.organization.length === 0) ? 
                    <div>empty another organization</div> : 
                    <div className={styles.table}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Inventory</TableCell>
                                    <TableCell>Member</TableCell>
                                </TableRow>
                            </TableHead>
                            {this.tabBody()}
                        </Table>
                    </div>
                    }
                </React.Fragment>
            )
        }
    }
}

const TableListOrganization = connect()(Table_list_organization);
const TableListOtherOrganization = connect()(Table_list_other_organization);

export {TableListOrganization};
export {TableListOtherOrganization};