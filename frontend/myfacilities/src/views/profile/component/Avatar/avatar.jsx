import React from 'react';
import { useDispatch } from 'react-redux';
import { 
    Paper, 
    Avatar, 
    Grid, 
    Typography, 
    Box, 
    Button,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText} from '@material-ui/core';
import { 
    uploadAvatarAPI,
    removeAvatarAPI } from './avatarApi';
import styles from './avatar.module.scss';
import useStyles from './style';

function AvatarPaper(props) {
    const { name, username, email, avatar } = props;
    const classes = useStyles();

    const [dialogUploadState, setDialogUploadState] = React.useState(false)
    const [dialogRemoveState, setDialogRemoveState] = React.useState(false)

    const openDialogUploadHandler = () => {
        setDialogUploadState(true)
    }
    const closeDialogUploadHandler = () => {
        setDialogUploadState(false)
    }
    const openDialogRemoveHandler = () => {
        setDialogRemoveState(true)
    }
    const closeDialogRemoveHandler = () => {
        setDialogRemoveState(false)
    }

    return (
        <Paper className={styles.paper}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Grid container spacing={3} justify="flex-end">
                        <Grid item xs>
                            <Typography variant="h4">{name}</Typography>
                            <Typography variant="body">{username}</Typography>
                            <Typography variant="section">
                                <Box fontStyle="italic">
                                    {email}
                                </Box>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Avatar 
                            className={classes.avatar} 
                            src={avatar}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                    <Button 
                        onClick={openDialogUploadHandler}
                        color="primary" 
                    >
                        Upload Avatar
                    </Button>
                    <Button 
                        onClick={openDialogRemoveHandler}
                        color="secondary"
                    >
                        Remove Avatar
                    </Button>
                </Grid>
            </Grid>
            <UploadAvatarDialog 
                open={dialogUploadState} 
                onClose={closeDialogUploadHandler}
            />
            <RemoveAvatarDialog
                open={dialogRemoveState}
                onClose={closeDialogRemoveHandler}
            />
        </Paper>
    )
}

function UploadAvatarDialog({open, onClose}) {
    const [file, setFile] = React.useState(null);
    const [url, setUrl] = React.useState(null);

    const classes = useStyles();
    const dispatch = useDispatch();

    const changeHandler = (e) => {
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
        setUrl(URL.createObjectURL(e.target.files[0]));
    }
    const closeDialog = () => {
        setFile(null);
        setUrl(null);
        onClose();
    }
    const submitUpload = () => {
        const formData = new FormData();
        formData.append("image", file);
        
        dispatch(uploadAvatarAPI({
            formData: formData, 
            closeDialog: closeDialog,
        }));
    }
    return (
        <Dialog open={open} onClose={closeDialog}>
            <DialogTitle>Upload Avatar</DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={3}>
                    {(url) ? 
                    <Grid item>
                        <Avatar src={url} className={classes.avatar}/>
                    </Grid> :
                    <null />}
                    <Grid item xs>
                        <input 
                            accept="image/*"
                            id="upload-avatar"
                            type="file"
                            onChange={changeHandler}
                            // className={styles.input}
                        />
                    </Grid>
                </Grid>
                <DialogContentText color="secondary">
                    Attention: Avatar cannot exceed 5 MB, and extension must be jpeg, jpg or png.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={closeDialog}>Cancel</Button>
                <Button color="primary" onClick={submitUpload}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}

function RemoveAvatarDialog({open, onClose}) {
    const dispatch = useDispatch();
    
    const submitRemove = () => {
        dispatch(removeAvatarAPI({
            closeDialog: onClose,
        }));
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Remove Avatar</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure want to remove avatar ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={onClose}>Cancel</Button>
                <Button color="primary" onClick={submitRemove}>Remove</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AvatarPaper;