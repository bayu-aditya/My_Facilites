import React from 'react';
import { 
    Paper, 
    Typography, 
    Divider } from '@material-ui/core';
import Loading from '../../../../component/loading';
import styles from './information.module.scss';

function Information(props) {
    const { name, desc, isLoad } = props;

    if (isLoad) {
        return (
            <Paper>
                <Loading />
            </Paper>
        ) 
    } else {
        return (
            <Paper className={styles.bg}>
                <Typography variant="h4">{name}</Typography>
                <Divider />
                <Typography variant="body">{desc}</Typography>
            </Paper>
        )
    }
}

export default Information;