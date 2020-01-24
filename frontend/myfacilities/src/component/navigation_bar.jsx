import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {delete_access_token, delete_refresh_token} from '../action/cookie.js';
import { Redirect } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  list: {
      width: 250,
  },
  fullList: {
      width: 'auto'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


export default function Navigation() {
    const classes = useStyles();

    function redirect(inpt) {
        console.log(inpt);
        window.location = inpt;
    }

    const list_drawer = [
        {
            "name": "My Organization",
            "link": "/dashboard"
        },
        // {
        //     "name": "Inventory",
        //     "link": "/dashboard/inventory"
        // }
    ];

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
        delete_access_token();
        delete_refresh_token();
        window.location.reload(); // ganti redirect to login aja
    }

    const sideList = () => (
        <div 
            className={classes.list}
            role="presentation"
        >
            <List>
                <h5>Header Drawer</h5>
                {list_drawer.map((data) => {
                    let text = data.name;
                    let link = data.link;
                    return (
                        <ListItem button key={text}>
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
                    <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                    >
                    <AccountCircle />
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