import React from 'react';
import Menu_row_inv from '../../../component/menu_list/menu_inventory';
import Loading from '../../../component/loading';

import { get_cookie } from '../../../action/cookie';
import '../table.scss';

function retrieveAPI(that) {
    let url = that.url + "?_id=" + that.id_org
    let self = that;
    console.log(url);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 202) {
                let resp = JSON.parse(this.responseText);
                console.log(resp);
                self.setState({
                    isLoad: false,
                    inventory: resp["inventory"]
                })
            }
        }
    xhr.open("GET", url);
    xhr.setRequestHeader('Authorization', 'Bearer '+that.state.access_token);
    xhr.send()
}

export class List_Inventory extends React.Component {
    constructor(props) {
        super(props);
        this.id_org = get_cookie("_id_org");
        this.url = "http://0.0.0.0:8888/organization/inventories";
        this.state = {
            access_token: this.props.access_token,
            auth: true,
            isLoad: true,
            inventory: []
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
                                            <Menu_row_inv 
                                            id_org={self.id_org}
                                            id_inv={id}
                                            name_inv={name}
                                            access_token={self.state.access_token}/>
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