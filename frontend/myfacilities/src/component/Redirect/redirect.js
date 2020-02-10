import React from 'react';
import {Redirect} from 'react-router-dom';

function GoToRegister() {
    window.location.href = "/register";
}

function GoToLogin() {
    return (
        <Redirect to='/' />
    )
}

function GoToDashboard() {
    window.location.href = "/next_dashboard";
}

function GoToInventory() {
    window.location.href = "/next_dashboard/next_inventory";
}

function GoToTimeline() {
    window.location.href = '/next_dashboard/next_inventory/next_timeline';
}

export {GoToRegister};
export {GoToLogin};
export {GoToDashboard};
export {GoToInventory};
export {GoToTimeline};