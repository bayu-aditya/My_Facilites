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

function GoToTimeline() {
    return (
        <Redirect to='/dashboard/inventory/timeline' />
    )
}

export {GoToLogin};
export {GoToInventory};
export {GoToTimeline};