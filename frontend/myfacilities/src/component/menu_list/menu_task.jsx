import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Delete_task } from '../deleting';

export default function Menu_row_task(params) {
    // params : {id_org, id_inv, id_task}

    const ITEM_HEIGHT = 100;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
        <IconButton
            size="small"
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
        >
            <MoreVertIcon />
        </IconButton>
        <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
            style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: 150,
            },
            }}
        >
            {/* <Edit_inventory 
                id_org={params.id_org} 
                id_inv={params.id_inv}
            /> */}
            <Delete_task
                id_task={params.id_task}
            />
        </Menu>
        </div>
    );
}