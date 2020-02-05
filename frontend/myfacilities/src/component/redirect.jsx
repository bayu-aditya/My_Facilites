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
    window.location.href = "/dashboard";
}

function GoToInventory() {
    window.location.href = "/dashboard/inventory";
}

function GoToTimeline() {
    window.location.href = '/dashboard/inventory/timeline';
}

export {GoToRegister};
export {GoToLogin};
export {GoToDashboard};
export {GoToInventory};
export {GoToTimeline};