import React from 'react';
import { 
    Paper, 
    Avatar, 
    Grid, 
    Typography, 
    Box } from '@material-ui/core';
import styles from './avatar.module.scss';
import useStyles from './style';


function AvatarPaper(props) {
    const { name, username, email } = props;
    const classes = useStyles();

    return (
        <Paper className={styles.paper}>
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
                    src="https://www.w3schools.com/howto/img_avatar.png"
                    />
                </Grid>
            </Grid>
        </Paper>
    )
}

export default AvatarPaper;