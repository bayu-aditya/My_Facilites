import React from 'react';
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
import styles from './colorpicker.module.scss';

function ColorChooser() {
    const [open, setOpen] = React.useState(false);
    const [textbtn, setTextbtn] = React.useState("Pick Color");
    const [colorbtn, setColorbtn] = React.useState("primary");
    const [value, setValue] = React.useState("#00E396");

    const setDialogHandler = () => {
        setOpen(!open);
        setTextbtn((open) ? "Pick color" : "Close")
        setColorbtn((open) ? "primary" : "secondary")
    }
    const changeHandler = (color) => {
        setValue(color.hex);
    }
    return (
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography>Your color in this organization is:</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <ColorAndText value={value} />
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
                            {(open) ?
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
                <Button color="secondary">Cancel</Button>
                <Button color="primary">Save</Button>
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

export default ColorChooser;