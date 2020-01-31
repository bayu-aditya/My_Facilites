import React from 'react';
import { Add_inv } from '../../../component/adding';
import Navigation from '../../../component/navigation_bar';
import List_Inventory from './list_inventory';
import List_Member from './list_member';
import { GoToLogin } from '../../../component/redirect';
import { connect } from 'react-redux';
import { fetchName } from '../../../action';

function mapStateToProps(state) {
    return {
        auth: state.auth,
        name: state.name,
    }
}

class Inventory extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            auth: this.props.auth,
        }
        console.log(this.state)
    }
    componentDidMount() {
        this.props.dispatch(fetchName());
    }
    checkAuth() {
        if (this.state.auth === false) return <GoToLogin />
    }
    render() {
        return (
            <div>
                {this.checkAuth()}
                <Navigation />
                <div className="row">
                    <div className="container-sm pt-3 mt-3 border col-sm-7">
                        <h3>My Inventory</h3>
                        <Add_inv />
                        <List_Inventory />
                    </div>
                    <div className="container-sm pt-3 mt-3 border col-sm-4">
                        <h3>People in this Organization</h3>
                        <List_Member />
                    </div>
                </div>
            </div>
        )   
    }
}

export default connect(mapStateToProps)(Inventory);