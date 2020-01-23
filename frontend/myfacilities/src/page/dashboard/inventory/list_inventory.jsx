import React from 'react';
import { GoToLogin } from '../../../component/redirect';
import Menu_row_inv from '../../../component/menu_list/menu_inventory';
import { Delete_inventory } from '../../../component/deleting';
import Loading from '../../../component/loading';
import { Edit_inventory } from '../../../component/editing';

import { get_cookie, delete_access_token } from '../../../action/cookie';
import '../table.scss';

export class List_Inventory extends React.Component {
    constructor(props) {
        super(props);
        this.access_token = this.props.access_token;
        this.id_org = get_cookie("_id_org");
        this.url = "http://0.0.0.0:8888/organization/inventories";
        this.state = {
            isLoad: true,
            auth: true,
            inventory: []
        }
    }
    componentDidMount() {
        let url = this.url + "?_id=" + this.id_org
        let self = this;
        console.log(url);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 202) {
                    let resp = JSON.parse(this.responseText);
                    console.log(resp);
                    self.setState({
                        isLoad: false,
                        inventory: resp["inventory"]
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
    tabBody = () => {
        let self = this;
        if (this.state.isLoad === true) {
            return <Loading />
        } else {
            if (this.state.inventory.length === 0) {
                return <span>Inventory is empty.</span>
            } else {
                return (
                    <tbody>
                        {this.state.inventory.map(
                            function row(data, index) {
                                let id = data["_id"];
                                let name = data["name"];
                                return (
                                    <tr key={index} id={id}>
                                        <td>{name}</td>
                                        <td className="auto-width">
                                            {/* <Edit_inventory id_org={self.id_org} id_inv={id} access_token={self.access_token}/> */}
                                            {/* <Delete_inventory 
                                            id_org={self.id_org}
                                            id_inv={id}
                                            name_inv={name}
                                            access_token={self.access_token} /> */}
                                            <Menu_row_inv 
                                            id_org={self.id_org}
                                            id_inv={id}
                                            name_inv={name}
                                            access_token={self.access_token}/>
                                        </td>
                                    </tr>    
                                )
                            }
                        )}
                    </tbody>
                )
            }
        }
    }
    render() {
        return (
                <div>
                    {this.checkAuth()}                    
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th>Name Inventory</th>
                                <th></th>
                            </tr>
                        </thead>
                        {this.tabBody()}
                    </table>
                </div>
        )
    }
}