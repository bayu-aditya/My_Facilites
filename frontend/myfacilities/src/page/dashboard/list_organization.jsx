import React from 'react';

import Loading from '../../component/loading';
import { GoToInventory } from '../../component/redirect';
import { Add_org } from '../../component/adding';
import Menu_row_org from '../../component/menu_list/menu_organization';
import { create_cookie } from '../../action/cookie.js';
import { organizations_api } from '../../api/link.js'
import './table.scss';

function retrieveAPI(self) {
    let url = self.url;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 202) {
                let resp = JSON.parse(this.responseText);
                console.log(resp);
                self.setState({
                    organization: resp["organization"],
                    isLoad: false
                })
            }
        }
    xhr.open("GET", url);
    xhr.setRequestHeader('Authorization', 'Bearer '+self.state.access_token);
    xhr.send();
}

export class Table_list_organization_new extends React.Component {
    constructor(props) {
        super(props);
        this.url = organizations_api();
        this.state = {
            access_token: this.props.access_token,
            auth: true,
            isLoad: true,
            select: false,
            organization: []
        }
    }
    componentDidUpdate() {
        let self = this;
        if (this.state.isLoad === true) {
            let update_access_token = this.props.access_token;
            if (update_access_token !== this.state.access_token) {
                this.setState({access_token: update_access_token});
            } else {
                retrieveAPI(self);
            }
        }
    }
    selectHandler = (e) => {
        console.log(e.target.parentNode.id);
        create_cookie("_id_org", e.target.parentNode.id);
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
                                        name_org={name} 
                                        access_token={self.state.access_token} />
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
                <Add_org access_token={this.state.access_token}/>
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
        )
    }
}