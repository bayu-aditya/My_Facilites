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
import { DeleteMember } from './component';

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
            admin: [],
            members: [],
        };
        this.id_org = this.props.id_org;
        this.image = "https://www.w3schools.com/howto/img_avatar.png";
    }
    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            const { isLoad, admin, members } = this.props;
            this.setState({
                isLoad: isLoad,
                admin: admin,
                members: members,
            })
        }
    }
    adminList() {
        let self = this;
        if (this.state.admin.length === 0) {
            return <span>No Administrator</span>
        } else {
            return (
                <div>
                    {this.state.admin.map(
                        (data, index) => {
                            let avatar = data["avatar"] ? data["avatar"] : self.image;
                            let name = data["name"];
                            let username = data["username"];
                            let color = data["color"];
                            return (
                                <ListItem dense key={index}>
                                    <ListItemAvatar>
                                        <Avatar src={avatar} />
                                    </ListItemAvatar>
                                    <ListItemText 
                                        primary={<Typography>{name}</Typography>}
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
        let self = this;
        if (this.state.members.length === 0) {
            return <span>No members</span>
        } else {
            return (
                <div>
                    {this.state.members.map(
                        (data, index) => {
                            let avatar = data["avatar"] ? data["avatar"] : self.image;
                            let name = data["name"];
                            let username = data["username"];
                            let color = data["color"];
                            return (
                                <ListItem dense key={index}>
                                    <ListItemAvatar>
                                        <Avatar src={avatar} />
                                    </ListItemAvatar>
                                    <ListItemText 
                                        primary={<Typography>{name}</Typography>}
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

export default ListMember;