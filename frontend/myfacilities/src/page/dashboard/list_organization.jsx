import React from 'react';

import Loading from '../../component/loading';
import { GoToLogin, GoToInventory } from '../../component/redirect';
import { Add_org } from '../../component/adding';
import Menu_row_org from '../../component/menu_list/menu_organization';
import { create_cookie, delete_access_token } from '../../action/cookie.js';

import './table.scss';

export class Table_list_organization_new extends React.Component {
    constructor(props) {
        super(props);
        this.access_token = this.props.access_token;
        this.url = "http://0.0.0.0:8888/organizations";
        this.state = {
            auth: true,
            isLoad: true,
            select: false,
            organization: []
        }
    }
    componentDidMount() {
        let url = this.url;
        let self = this;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 202) {
                    let resp = JSON.parse(this.responseText);
                    console.log(resp);
                    self.setState({
                        organization: resp["organization"],
                        isLoad: false
                    })
                } else if (this.status === 401) {
                    let resp = JSON.parse(this.responseText);
                    console.log(resp);
                    delete_access_token();
                    self.setState({auth: false})
                }
            }
        }
        xhr.open("GET", url);
        xhr.setRequestHeader('Authorization', 'Bearer '+this.access_token);
        xhr.send()
    }
    checkAuth() {
        if (this.state.auth === false) return <GoToLogin />
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
                            return (
                                <tr key={index} id={id}>
                                    <td onClick={self.selectHandler}>{name}</td>
                                    <td onClick={self.selectHandler}>{num_inv}</td>
                                    <td className='auto-width'>
                                        <Menu_row_org 
                                        id_org={id} 
                                        name_org={name} 
                                        access_token={self.access_token} />
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
                {this.checkAuth()}
                {this.selectRender()}
                <Add_org access_token={this.access_token}/>
                <table id="tb_org" className="table table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Inventory Count</th>
                            <th></th>
                        </tr>
                    </thead>
                    {this.tabBody()}
                </table>
            </div>
        )
    }
}