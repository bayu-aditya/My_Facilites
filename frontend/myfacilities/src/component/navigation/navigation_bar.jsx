import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {delete_access_token, delete_refresh_token} from '../../action/cookie.js';
import {connect} from 'react-redux';
import { useDispatch } from 'react-redux'
import { Avatar, Divider, ListItemIcon } from '@material-ui/core';
import useStyles from './style';

function mapStateToProps(state) {
    return {
        name: state.name
    }
}

function Navigation(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    function redirect(inpt) {
        console.log(inpt);
        window.location = inpt;
    }

    const list_drawer = [
        {
            "name": "My Organizations",
            "link": "/dashboard"
        },
        {
            "name": "Profile",
            "link": "/dashboard"
        }
    ];
    const icons_drawer = [
        <HomeWorkIcon />,
        <AccountBoxIcon />
    ]

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const [openDraw, setOpenDraw] = React.useState(false);

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenDraw = () => {setOpenDraw(true)}
    const handleCloseDraw = () => {setOpenDraw(false)}
    const handleLogout = () => {
        console.log("logout handler");
        delete_refresh_token();
        delete_access_token();
        dispatch({type: "LOGOUT"});
        setTimeout(() => {window.location.reload()}, 1000);
    }

    const sideList = () => (
        <div
            className={classes.list}
            role="presentation"
        >
            <List>
                <div className={classes.profile}>
                    <Avatar src="https://www.w3schools.com/howto/img_avatar.png" className={classes.avatar} />
                    <Typography variant="h6" component="h6" >Hello</Typography>
                    <Typography>{props.name}</Typography>
                    <Typography>{props.username}</Typography> 
                </div>
                <Divider></Divider>
                {list_drawer.map((data, index) => {
                    let text = data.name;
                    let link = data.link;
                    return (
                        <ListItem button key={text}>
                            <ListItemIcon>{icons_drawer[index]}</ListItemIcon>
                            <ListItemText primary={text}
                            onClick={() => redirect(link)} />
                        </ListItem>
                    )
                })}
            </List>
        </div>
    );

    return (
        <div className={classes.root}>
            <Drawer open={openDraw} onClose={handleCloseDraw}>
                {sideList()}
            </Drawer>
            <AppBar position="static">
                <Toolbar>
                <IconButton edge="start" className={classes.menuButton} onClick={handleOpenDraw} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
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
                    <Avatar src="https://www.w3schools.com/howto/img_avatar.png" />
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
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <div className="dropdown-divider"></div>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default connect(mapStateToProps)(Navigation);