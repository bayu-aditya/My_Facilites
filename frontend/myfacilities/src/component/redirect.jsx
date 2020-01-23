import React from 'react';
import {Redirect} from 'react-router-dom';

function GoToLogin() {
    return (
        <Redirect to='/' />
    )
}

function GoToInventory() {
    return (
        <Redirect to='/dashboard/inventory' />
    )
}

export {GoToLogin};
export {GoToInventory};