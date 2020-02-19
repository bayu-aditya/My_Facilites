import React from 'react';
import { 
    List, 
    ListItem, 
    ListItemText, 
    ListItemAvatar, 
    Avatar, 
    ListSubheader, 
    ListItemSecondaryAction, 
    Grid,
    Typography } from '@material-ui/core';
import Loading from '../../component/loading';
import { members_api } from '../../api/link.js';
import { connect } from 'react-redux';
import { DeleteMember } from '../../component/deleting';
import { fetchMemberOrganization } from '../../action';

function mapStateToProps(state) {
    return {
        id_org: state.id_org,
    }
}

const MemberCaption = (props) => {
    const { color } = props;
    const locStyle = {
        backgroundColor: color,
        marginTop: '3px',
        width: '15px',
        height: '15px',
        display: 'inline-block',
        borderRadius: '10px',
    }
    return (
        <Grid container spacing={1}>
            <Grid item>
                <div style={locStyle}></div>
            </Grid>
            <Grid item xs>
                <Typography variant="caption">{color}</Typography>
            </Grid>
        </Grid>
    )
}

class ListMember extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoad: true,
            admin: null,
            members: []
        };
        this.id_org = this.props.id_org;
        this.image = "https://www.w3schools.com/howto/img_avatar.png";
        this.url = members_api();
    }
    componentDidMount() {
        this.props.dispatch(fetchMemberOrganization(this));
    }
    adminList() {
        if (this.state.admin.length === 0) {
            return <span>No Administrator</span>
        } else {
            return (
                <div>
                    {this.state.admin.map(
                        (data, index) => {
                            let username = data["username"];
                            let color = data["color"];
                            return (
                                <ListItem dense key={index}>
                                    <ListItemAvatar>
                                        <Avatar src="https://www.w3schools.com/howto/img_avatar.png" />
                                    </ListItemAvatar>
                                    <ListItemText 
                                        primary={<Typography>{username}</Typography>}
                                        secondary={<MemberCaption color={color} />} 
                                    />
                                </ListItem>
                            )
                        })}
                </div>
            )
        }
    }
    bodyList() {
        if (this.state.members.length === 0) {
            return <span>No members</span>
        } else {
            return (
                <div>
                    {this.state.members.map(
                        (data, index) => {
                            let username = data["username"];
                            let color = data["color"];
                            return (
                                <ListItem dense key={index}>
                                    <ListItemAvatar>
                                        <Avatar src="https://www.w3schools.com/howto/img_avatar.png" />
                                    </ListItemAvatar>
                                    <ListItemText 
                                        primary={<Typography>{username}</Typography>}
                                        secondary={<MemberCaption color={color} />} 
                                    />
                                    <ListItemSecondaryAction>
                                        <DeleteMember username={username} />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                        })}
                </div>
            )
        }
    }
    render() {
        if (this.state.isLoad === true) {
            return <Loading />
        } else {
            return (
                <div>
                    <List 
                    subheader={<ListSubheader>Administrator</ListSubheader>} >
                        {this.adminList()}
                    </List>
                    <List subheader={<ListSubheader>Members</ListSubheader>} >
                        {this.bodyList()}
                    </List>
                </div>
            )
        }
    }
}

export default connect(mapStateToProps)(ListMember);