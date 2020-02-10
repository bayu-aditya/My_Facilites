import React from 'react';
import { connect } from 'react-redux';
import Loading from '../../component/loading';
import Menu_row_org from '../../component/menu_list/menu_organization';
import { 
    organizations_api, 
    other_organizations_api } from '../../api/link.js';
import { 
    fetchOrganizations, 
    fetchOtherOrganizations } from '../../action';
import { setIdOrg } from '../../action';
import { GoToInventory } from '../../component/redirect';
import styles from './organization.module.scss';

class Table_list_organization extends React.Component {
    constructor(props) {
        super(props);
        this.url = organizations_api();
        this.state = {
            isLoad: true,
            organization: [],
        }
    }
    componentDidMount() {
        let self = this;
        this.props.dispatch(fetchOrganizations(self));
    }
    selectHandler = (e) => {
        console.log(e.target.parentNode.id);
        this.props.dispatch(setIdOrg(e.target.parentNode.id))
        GoToInventory();
    }
    tabBody = () => {
        let self = this;
        return (
            <tbody>
                {this.state.organization.map(
                    function row(data, index) {
                        let id = data["_id"];
                        let name = data["name"];
                        let num_inv = data["num_inv"];
                        let num_mem = data["num_mem"];
                        return (
                            <tr key={index} id={id}>
                                <td onClick={self.selectHandler}>{name}</td>
                                <td onClick={self.selectHandler}>{num_inv}</td>
                                <td onClick={self.selectHandler}>{num_mem}</td>
                                <td className={styles.auto_width}>
                                    <Menu_row_org 
                                    id_org={id} 
                                    name_org={name} />
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
                {/* {this.selectRender()} */}
                {(this.state.isLoad === true) ? <Loading /> : 
                <div>
                    {(this.state.organization.length === 0) ? 
                        <div>empty organization</div> :
                        <div className="table-responsive">
                        <table id="tb_org" className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Inventory</th>
                                    <th>Member</th>
                                    <th></th>
                                </tr>
                            </thead>
                            {this.tabBody()}
                        </table>
                        </div>
                    }
                </div>
                }
            </div>
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
            <tbody>
                {this.state.organization.map(
                    function row(data, index) {
                        let id = data["_id"];
                        let name = data["name"];
                        let admin = data["admin"];
                        let num_inv = data["num_inv"];
                        let num_mem = data["num_mem"];
                        return (
                            <tr key={index} id={id}>
                                <td onClick={self.selectHandler}>{name}</td>
                                <td onClick={self.selectHandler}>{admin}</td>
                                <td onClick={self.selectHandler}>{num_inv}</td>
                                <td onClick={self.selectHandler}>{num_mem}</td>
                                <td className={styles.auto_width}>
                                </td>
                            </tr>    
                        )
                    }
                )}
            </tbody>
        )
    }
    render() {
        if (this.state.isLoad === true) {
            return <Loading />
        } else {
            return (
                <div>
                    {(this.state.organization.length === 0) ? 
                    <div>empty another organization</div> : 
                    <div className="table-responsive">
                    <table id="tb_org" className="table table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Admin</th>
                                <th>Inventory</th>
                                <th>Member</th>
                                <th></th>
                            </tr>
                        </thead>
                        {this.tabBody()}
                    </table>
                    </div>
                    }
                </div>
            )
        }
    }
}

const TableListOrganization = connect()(Table_list_organization);
const TableListOtherOrganization = connect()(Table_list_other_organization);

export {TableListOrganization};
export {TableListOtherOrganization};