import React from 'react';
import { connect } from 'react-redux';
import { 
    Dialog, 
    DialogTitle, 
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { fetchDelMemberOrganization } from './deletememberApi';

function mapStateToProps(state) {
    return {
        id_org: state.id_org,
    }
}

class DeleteMember extends React.Component {
    constructor(props) {
        super(props);
        this.username = this.props.username;
        this.state = {
            dialog: false
        };
        this.id_org = this.props.id_org;
        this.body = {};
    }
    openDeleteDialog = () => {
        this.setState({dialog: true})
    }
    deleteHandler = () => {
        this.body = {
            "_id": this.id_org,
            "member": this.username,
        };
        this.props.dispatch(fetchDelMemberOrganization(this));
    }
    closeDeleteDialog = () => {
        this.setState({dialog: false})
    }
    deleteDialog = () => (
        <div>
            <Dialog
            open={this.state.dialog}
            onClose={this.closeDeleteDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">Remove {this.username}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure want to remove this member ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.closeDeleteDialog} color="primary" autoFocus>
                Disagree
                </Button>
                <Button onClick={this.deleteHandler} color="secondary">
                Agree
                </Button>
            </DialogActions>
            </Dialog>
        </div>
    )
    render() {
        return (
            <div>
                {this.deleteDialog()}
                <IconButton onClick={this.openDeleteDialog}>
                    <DeleteIcon color="secondary" />
                </IconButton>
            </div>
        )
    }
}

export default connect(mapStateToProps)(DeleteMember);