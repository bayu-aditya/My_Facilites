import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {delete_access_token, delete_refresh_token} from '../../../action/cookie.js';
import {connect} from 'react-redux';
import { useDispatch } from 'react-redux'
import { Avatar } from '@material-ui/core';
import useStyles from './style';

function mapStateToProps(state) {
    return {
        name: state.profile.name,
        avatar: state.profile.avatar
    }
}

function Topbar(props) {
    const { onSidebarOpen, modeMaximal } = props

    const classes = useStyles();
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        console.log("logout handler");
        delete_refresh_token();
        delete_access_token();
        dispatch({type: "LOGOUT"});
        setTimeout(() => {window.location.reload()}, 500);
    }

    const buttonSidebar = () => {
        if (!modeMaximal) {
            return (
                <IconButton edge="start" className={classes.menuButton} onClick={onSidebarOpen} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
            )   
        }
    }

    return (
        <div>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                {buttonSidebar()}
                <Typography variant="h6" className={classes.title}>
                    Dashboard
                </Typography>
                <div>
                    <Typography>
                        {props.name}
                    </Typography>
                </div>
                <div>
                    <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                    >
                    <Avatar src={props.avatar} />
                    </IconButton>
                    <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                    >
                    {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <div className="dropdown-divider"></div> */}
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

Topbar.propTypes = {
    onSidebarOpen: PropTypes.func.isRequired,
    modeMaximal: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps)(Topbar);