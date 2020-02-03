import React from 'react';
import { connect } from 'react-redux';
import Loading from '../../component/loading';
import { GoToInventory } from '../../component/redirect';
import { Add_org } from '../../component/adding';
import Menu_row_org from '../../component/menu_list/menu_organization';
import { 
    organizations_api, 
    other_organizations_api } from '../../api/link.js';
import { 
    fetchOrganizations, 
    fetchOtherOrganizations } from '../../action';
import { setIdOrg } from '../../action';
import './table.scss';

class Table_list_organization extends React.Component {
    constructor(props) {
        super(props);
        this.url = organizations_api();
        this.state = {
            isLoad: true,
            select: false,
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
        this.setState({select: true})
    }
    selectRender() {
        if (this.state.select === true) return <GoToInventory />
    }
    tabBody = () => {
        let self = this;
        if (this.state.isLoad === true) {
            return <Loading />
        } else {
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
                                    <td className='auto-width'>
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
    }
    render() {
        return (
            <div>
                {this.selectRender()}
                <Add_org />
                {(this.state.organization.length === 0) ? 
                <div>empty organization</div>:
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
                </table>}
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
            select: false,
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
        this.setState({select: true})
    }
    selectRender() {
        if (this.state.select === true) return <GoToInventory />
    }
    tabBody = () => {
        let self = this;
        if (this.state.isLoad === true) {
            return <Loading />
        } else {
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
                                    <td className='auto-width'>
                                    </td>
                                </tr>    
                            )
                        }
                    )}
                </tbody>
            )
        }
    }
    render() {
        return (
            <div>
                {this.selectRender()}
                {(this.state.organization.length === 0) ? 
                <div>empty another organization</div> : 
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
                </table>}
            </div>
        )
    }
}

const TableListOrganization = connect()(Table_list_organization);
const TableListOtherOrganization = connect()(Table_list_other_organization);

export {TableListOrganization};
export {TableListOtherOrganization};