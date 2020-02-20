import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {connect} from 'react-redux';
import { Avatar, Divider, ListItemIcon } from '@material-ui/core';
import useStyles from './style';

function mapStateToProps(state) {
    return {
        name: state.profile.name
    }
}

function Sidebar(props) {
    const { open, onClose, modeMaximal } = props;

    const classes = useStyles();

    function redirect(inpt) {
        window.location.href = inpt;
    }

    const list_drawer = [
        {
            "name": "My Organizations",
            "link": "/next_dashboard"
        },
        {
            "name": "Profile",
            "link": "/profile"
        }
    ];
    const icons_drawer = [
        <HomeWorkIcon />,
        <AccountBoxIcon />
    ]

    const sideList = () => (
        <div
            className={clsx({
                [classes.list]: true, 
                [classes.shiftList]: modeMaximal})}
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
                        <ListItem button key={text} onClick={() => redirect(link)}>
                            <ListItemIcon>{icons_drawer[index]}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    )
                })}
            </List>
        </div>
    );

    return (
        <div>
            <Drawer 
                open={open} 
                onClose={onClose} 
                variant={modeMaximal ? 'permanent' : 'temporary'}
                className={classes.drawer} 
            >
                {sideList()}
            </Drawer>
        </div>
    );
}

Sidebar.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    modeMaximal: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps)(Sidebar);