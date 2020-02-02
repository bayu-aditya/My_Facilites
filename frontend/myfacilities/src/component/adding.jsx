import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';
import { DialogTitle, DialogContent, TextField, withStyles } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { 
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    KeyboardTimePicker } from '@material-ui/pickers';

import { get_datetime } from '../tools/datetime_format.js';
import { organization_api, inventory_api, task_api } from '../api/link.js';
import { connect } from 'react-redux';
import { fetchAddTask } from '../action';

const useStyles = theme => ({
    root: {
        '& .MuiTextField-root': {
            marginRight: theme.spacing(1),
            marginBottom: theme.spacing(1)
        }
    }
});

function mapStateToProps(state) {
    return {
        access_token: state.access_token,
        username: state.name,
        id_org: state.id_org,
        id_inv: state.id_inv,
    }
}

class Adding_org extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            name: null,
            desc: null
        };
        this.url = organization_api();
    }

    handleOpen = () => {
        this.setState({open: true})
    }
    handleClose = () => {
        this.setState({open: false})
    }
    changeHandler = (e) => {
        this.setState({[e.target.id]: e.target.value})
    }
    submitHandler = (event) => {
        event.preventDefault();
        console.log("submitted Form:");
        let url = this.url;
        let self = this;
        let body = {
            "name": this.state.name,
            "desc": this.state.desc
        }
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 202) {
                    let resp = JSON.parse(this.responseText);
                    console.log(resp);
                    self.handleClose();
                    window.location.reload();
                }
            }
        }
        xhr.open("POST", url);
        xhr.setRequestHeader('Authorization', 'Bearer '+this.props.access_token);
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify(body))
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button size="small" color="primary" variant="contained" aria-label="add" onClick={this.handleOpen} disableElevation>
                    <AddIcon />Adding
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} className={classes.root}>
                    <DialogTitle>Adding an Organization</DialogTitle>
                    <DialogContent>
                        <form className={classes.root} autoComplete="off" onSubmit={this.submitHandler}>
                            <div className={classes.root}>
                                <TextField fullWidth id="name" label="name" variant="outlined" onChange={this.changeHandler} required/>
                                <TextField fullWidth id="desc" label="desc" onChange={this.changeHandler}
                                multiline rows="5" variant="outlined" />
                            </div>
                            <Button type="submit">create</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

class Adding_inv extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            name: null,
            desc: null
        };
        this._id_org =  this.props.id_org;
        this.url = inventory_api();
    }

    handleOpen = () => {
        this.setState({open: true})
    }
    handleClose = () => {
        this.setState({open: false})
    }
    changeHandler = (e) => {
        this.setState({[e.target.id]: e.target.value})
    }
    submitHandler = (event) => {
        event.preventDefault();
        let url = this.url;
        let self = this;
        let body = {
            "_id_org": this._id_org,
            "name": this.state.name
        }
        console.log(body);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 202) {
                    let resp = JSON.parse(this.responseText);
                    console.log(resp);
                    self.handleClose();
                    window.location.reload();
                }
            }
        }
        xhr.open("POST", url);
        xhr.setRequestHeader('Authorization', 'Bearer '+this.props.access_token);
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify(body))
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button size="small" color="primary" variant="contained" aria-label="add" onClick={this.handleOpen} disableElevation>
                    <AddIcon />Adding
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} className={classes.root}>
                    <DialogTitle>Adding an Organization</DialogTitle>
                    <DialogContent>
                        <form className={classes.root} autoComplete="off" onSubmit={this.submitHandler}>
                            <div className={classes.root}>
                                <TextField fullWidth id="name" label="name" variant="outlined" onChange={this.changeHandler} required/>
                                <TextField fullWidth id="desc" label="desc" onChange={this.changeHandler}
                                multiline rows="5" variant="outlined" />
                            </div>
                            <Button type="submit">create</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

class Adding_task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            username: this.props.username,
            date_start: new Date(),
            date_finish: new Date(),
            notes: null,
        };
        this.id_org =  this.props.id_org;
        this.id_inv = this.props.id_inv;
        this.access_token = this.props.access_token;
        this.url = task_api();
        this.body = {}
    }

    handleOpen = () => {
        this.setState({open: true})
    }
    handleClose = () => {
        this.setState({open: false})
    }
    changeNotesHandler = (e) => {
        this.setState({notes: e.target.value})
    }
    submitHandler = (event) => {
        event.preventDefault();
        this.body = {
            "id_org": this.id_org,
            "id_inv": this.id_inv,
            "username": this.state.username,
            "start": get_datetime(this.state.date_start),
            "finish": get_datetime(this.state.date_finish),
            "note": this.state.notes
        }
        this.props.dispatch(fetchAddTask(this));
    }
    handleDateStartChange = (date) => {
        this.setState({date_start: date})
    }
    handleDateFinishChange = (date) => {
        this.setState({date_finish: date})
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button size="small" color="primary" variant="contained" aria-label="add" onClick={this.handleOpen} disableElevation>
                    <AddIcon />Adding
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} className={classes.root}>
                    <DialogTitle>Add Your Task</DialogTitle>
                    <DialogContent>
                        <form className={classes.root} autoComplete="off" onSubmit={this.submitHandler}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <div className="row">
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Choose Start Date"
                                        format="dd/MM/yyyy"
                                        value={this.state.date_start}
                                        onChange={this.handleDateStartChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                    <KeyboardTimePicker
                                        margin="normal"
                                        id="time-picker"
                                        label="Choose Start Time"
                                        value={this.state.date_start}
                                        onChange={this.handleDateStartChange}
                                        KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                        }}
                                    />
                                </div>
                                <div className="row">
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Choose Finish Date"
                                        format="dd/MM/yyyy"
                                        value={this.state.date_finish}
                                        onChange={this.handleDateFinishChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                    <KeyboardTimePicker
                                        margin="normal"
                                        id="time-picker"
                                        label="Choose Finish Time"
                                        value={this.state.date_finish}
                                        onChange={this.handleDateFinishChange}
                                        KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                        }}
                                    />
                                </div>
                                <div className="row">
                                    <TextField fullWidth id="desc" label="desc" onChange={this.changeNotesHandler}
                                    multiline rows="5" variant="outlined" />
                                </div>
                                </MuiPickersUtilsProvider>
                            <Button type="submit">submit task</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

const Add_org = connect(mapStateToProps)(withStyles(useStyles)(Adding_org));
const Add_inv = connect(mapStateToProps)(withStyles(useStyles)(Adding_inv));
const Add_task = connect(mapStateToProps)(withStyles(useStyles)(Adding_task));

export {Add_org, Add_inv, Add_task};