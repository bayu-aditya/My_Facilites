import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useMediaQuery } from '@material-ui/core';
import { Topbar, Sidebar } from './component';
import useStyles from './style';

const Main = props => {
    const { children } = props;
    const classes =  useStyles();
    const isDesktop = useMediaQuery('(min-width:1000px)', {
      defaultMatches: true
    });

    const [openSidebar, setOpenSidebar] = useState(false);

    const handleSidebarOpen = () => {
        setOpenSidebar(true)
    }
    const handleSidebarClose = () => {
        setOpenSidebar(false)
    }

    return (
        <div className={classes.root}>
            <Topbar 
                onSidebarOpen={handleSidebarOpen}
                className={classes.shiftTopbar} 
                modeMaximal={isDesktop}
            />
            <Sidebar 
                open={openSidebar}
                onClose={handleSidebarClose} 
                modeMaximal={isDesktop}
            />
            <main className={clsx({
                [classes.content]: true, 
                [classes.shiftContent]: isDesktop
            })}>
                {children}
            </main>
        </div>
    )
}

Main.propTypes = {
    children: PropTypes.node
}

export default Main;