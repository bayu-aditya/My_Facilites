import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { ChromePicker } from 'react-color';
import {
    Button,
    Grid,
    Typography, 
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    ExpansionPanelActions, 
    Divider} from '@material-ui/core';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { fetchUpdateMemberOrganization } from '../../../../action';
import styles from './colorpicker.module.scss';

function mapStateToProps(state) {
    return {
        id_org: state.id_org,
    }
}

function ColorChooser(props) {
    const { color, id_org } = props;
    const dispatch = useDispatch();

    const [openPicker, setOpenPicker] = React.useState(false);
    const [textbtn, setTextbtn] = React.useState("Pick Color");
    const [colorbtn, setColorbtn] = React.useState("primary");
    const [value, setValue] = React.useState("#000000");

    const setDialogHandler = () => {
        setOpenPicker(!openPicker);
        setTextbtn((openPicker) ? "Pick color" : "Close")
        setColorbtn((openPicker) ? "primary" : "secondary")
    }
    const changeHandler = (color) => {
        setValue(color.hex);
    }
    const updateHandler = () => {
        let body = {
            "_id": id_org,
            "color": value,
        }
        dispatch(fetchUpdateMemberOrganization(body));
    }
    return (
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography>Your color in this organization is:</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <ColorAndText value={color} />
                    </Grid>
                </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography>Change Color to:</Typography>
                    </Grid>
                    <Grid item xs>
                        <ColorAndText value={value} />
                    </Grid>
                    <Grid item>
                        <div>
                            <Button
                                onClick={setDialogHandler}
                                variant="contained"
                                color={colorbtn}
                                size="small"
                            >
                                <ColorLensIcon />{textbtn}
                            </Button>
                            {(openPicker) ?
                            <div className={styles.popover}>
                                <ChromePicker
                                    color={value}
                                    onChangeComplete={changeHandler}
                                    disableAlpha={true}
                                />
                            </div> :
                            null
                            }
                        </div>
                    </Grid>
                </Grid>
            </ExpansionPanelDetails>
            <Divider />
            <ExpansionPanelActions>
                <Button onClick={updateHandler} color="primary">Save</Button>
            </ExpansionPanelActions>
        </ExpansionPanel>
    )
}

function ColorAndText(props) {
    const { value } = props;

    const locStyle = {
        backgroundColor: value,
        width: '25px',
        height: '25px',
        display: 'inline-block'
    }
    return (
        <Grid container spacing={1}>
            <Grid item>
                <div style={locStyle}></div>
            </Grid>
            <Grid item xs>
                <Typography>{value}</Typography>
            </Grid>
        </Grid>
    )
}

export default connect(mapStateToProps)(ColorChooser);