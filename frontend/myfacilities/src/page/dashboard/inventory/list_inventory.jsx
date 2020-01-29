import React from 'react';
import Menu_row_inv from '../../../component/menu_list/menu_inventory';
import Loading from '../../../component/loading';
import { connect } from 'react-redux';

import { get_cookie, create_cookie } from '../../../action/cookie';
import { inventories_api } from '../../../api/link.js';
import { GoToTimeline } from '../../../component/redirect';
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

function mapStateToProp(state) {
    return {
        access_token: state.access_token,
        id_org: state.id_org,
    }
}

class List_Inventory extends React.Component {
    constructor(props) {
        super(props);
        this.id_org = this.props.id_org;
        this.url = inventories_api();
        this.state = {
            access_token: this.props.access_token,
            isLoad: true,
            select: false,
            inventory: []
        }
    }
    componentDidMount() {
        let self = this;
        // if (this.state.isLoad === true) {
        //     let update_access_token = this.props.access_token;
        //     if (update_access_token !== this.state.access_token) {
        //         this.setState({access_token: update_access_token});
        //     } else {
        //         retrieveAPI(self);
        //     }
        // }
        retrieveAPI(self);
    }
    selectHandler = (e) => {
        console.log(e.target.parentNode.id);
        create_cookie("_id_inv", e.target.parentNode.id);
        this.setState({select: true});
    }
    selectRender() {
        if (this.state.select === true) return <GoToTimeline />
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
                                        <td onClick={self.selectHandler}>{name}</td>
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
                    {this.selectRender()}                    
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

export default connect(mapStateToProp)(List_Inventory);