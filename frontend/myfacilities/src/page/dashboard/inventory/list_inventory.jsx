import React from 'react';
import Menu_row_inv from '../../../component/menu_list/menu_inventory';
import Loading from '../../../component/loading';
import { connect } from 'react-redux';

import { create_cookie } from '../../../action/cookie';
import { inventories_api } from '../../../api/link.js';
import { GoToTimeline } from '../../../component/redirect';
import '../table.scss';
import { fetchInventories } from '../../../action';

function mapStateToProp(state) {
    return {
        id_org: state.id_org,
    }
}

class List_Inventory extends React.Component {
    constructor(props) {
        super(props);
        this.id_org = this.props.id_org;
        this.url = inventories_api();
        this.state = {
            isLoad: true,
            select: false,
            inventory: []
        }
    }
    componentDidMount() {
        this.props.dispatch(fetchInventories(this));
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
                                            name_inv={name} />
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