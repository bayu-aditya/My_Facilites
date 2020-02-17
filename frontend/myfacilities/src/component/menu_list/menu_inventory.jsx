import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Edit_inventory } from '../editing';
import { Delete_inventory } from '../deleting';

export default function Menu_row_inv(params) {
    // params : {id_org, id_inv, name_inv, access_token}

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
            <Edit_inventory 
                id_org={params.id_org} 
                id_inv={params.id_inv}
            />
            <Delete_inventory 
                id_org={params.id_org}
                id_inv={params.id_inv}
                name_inv={params.name_inv}
            />
        </Menu>
        </div>
    );
}