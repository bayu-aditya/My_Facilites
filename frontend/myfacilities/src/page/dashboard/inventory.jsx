import React from 'react';
import { Redirect } from 'react-router-dom';
import Navigation from '../../component/navigation_bar';
import { get_access_token } from '../../action/cookie.js';

export class Inventory extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            auth: false
        }
    }
    componentWillMount() {
        this.access_token = get_access_token();
        if (get_access_token()) {
            this.setState({auth: true})
        } else {
            this.setState({auth: false})
        }
    }
    checkAuth() {
        if (this.state.auth === false) return <Redirect to="/" />
    }
    render() {
        return (
            <div>
                {this.checkAuth()}
                <Navigation />
                <div className="row">
                    <div className="container-sm pt-3 mt-3 border col-sm-5">
                        <table className='table table-hover'>
                            <thead>
                                <tr>
                                    <th>Name Inventory</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Inventory1</td>
                                </tr>
                                <tr>
                                    <td>Inventory2</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}