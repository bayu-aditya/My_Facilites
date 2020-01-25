import React from 'react';
import { Add_inv } from '../../../component/adding';
import Navigation from '../../../component/navigation_bar';
import { List_Inventory } from './list_inventory';

import { auth_check } from '../../../action/auth.js';
import { get_access_token } from '../../../action/cookie.js';
import { List_Member } from './list_member';
import { GoToLogin } from '../../../component/redirect';

export class Inventory extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            auth: auth_check()
        }
        this.access_token = get_access_token();
    }
    render() {
        if (this.state.auth === false) {
            return (
                <div>
                    <GoToLogin />
                </div>
            )
        } else {
            return (
                <div>
                    <Navigation name={"testing"}/>
                    <div className="row">
                        <div className="container-sm pt-3 mt-3 border col-sm-7">
                            <h3>My Inventory</h3>
                            <Add_inv access_token={this.access_token} />
                            <List_Inventory access_token={this.access_token} />
                        </div>
                        <div className="container-sm pt-3 mt-3 border col-sm-4">
                            <h3>People in this Organization</h3>
                            <List_Member access_token={this.access_token} />
                        </div>
                    </div>
                </div>
            )   
        }
    }
}