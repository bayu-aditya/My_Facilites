import React from 'react';
import Navigation from '../../component/navigation_bar';
import {Table_list_organization} from '../../component/list_inventory';

export class Dashboard extends React.Component{
    render() {
        return (
            <div>
                <Navigation />
                <div className="row">
                    <div className="container-sm pt-3 mt-3 border col-sm-5">
                        <h3>List of Organizations</h3>
                        <Table_list_organization />
                    </div>
                </div>
            </div>
        )
    }
}