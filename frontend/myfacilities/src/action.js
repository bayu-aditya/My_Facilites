import { 
    user_api, 
    refresh_api, 
    organization_api,
    members_api } from './api/link';

const SET_NAME = "SET_NAME";
const SELECT_ORGANIZATION = "SELECT_ORGANIZATION";
const SELECT_INVENTORY = "SELECT_INVENTORY";
const FETCH_PROFILE_BEGIN = "FETCH_PROFILE_BEGIN";
const FETCH_PROFILE_SUCCESS = "FETCH_PROFILE_SUCCESS";
const FETCH_PROFILE_FAILED = "FETCH_PROFILE_FAILED";
const TOKEN_REFRESHER_BEGIN = "TOKEN_REFRESHER_BEGIN";
const TOKEN_REFRESHER_SUCCESS = "TOKEN_REFRESHER_SUCCESS";
const TOKEN_REFRESHER_FAILED = "TOKEN_REFRESHER_FAILED";

export const settingName = (name) => ({
    type: SET_NAME,
    name: name
})

export const setIdOrg = (id) => ({
    type: SELECT_ORGANIZATION,
    id_org: id
})

export const setIdInv = (id) => ({
    type: SELECT_INVENTORY,
    id_inv: id
})

export const fetchProfileBegin = () => ({
    type: FETCH_PROFILE_BEGIN
})
export const fetchProfileSuccess = (props) => ({
    type: FETCH_PROFILE_SUCCESS,
    name: props.name,
    username: props.username,
    email: props.email,
    avatar: props.avatar,
})
export const fetchProfileFailed = (error) => ({
    type: FETCH_PROFILE_FAILED,
    error: error
})

export const tokenRefresherBegin = () => ({
    type: TOKEN_REFRESHER_BEGIN
})
export const tokenRefresherSuccess = (access_token) => ({
    type: TOKEN_REFRESHER_SUCCESS,
    access_token: access_token
})
export const tokenRefresherFailed = (error) => ({
    type: TOKEN_REFRESHER_FAILED,
    error: error
})

export function fetchProfile() {
    return (dispatch, getState) => {
        let access_token = getState().access_token;
        dispatch(fetchProfileBegin());
        return fetch(user_api(), {
            method: 'GET',
            headers: {"Authorization": "Bearer " + access_token}
        })
            .then((res) => {
                if (res.status === 202) {
                    return res.json();
                } else if (res.status === 401) {
                    dispatch(tokenRefresher(fetchProfile));
                }
            })
            .then(json => {
                dispatch(fetchProfileSuccess({
                    name: json["name"],
                    username: json["username"],
                    email: json["email"],
                    avatar: json["avatar"] ? json["avatar"] : "https://www.w3schools.com/howto/img_avatar.png"
                }));
            })
            .catch(error => dispatch(fetchProfileFailed(error)));
    };
}

export function fetchUpdateProfile(self) {
    return (dispatch, getState) => {
        let access_token = getState().access_token;
        console.log(self.body);
        return fetch(self.url, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + access_token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(self.body),
        })
            .then((res) => {
                if (res.status === 202) {
                    return res.json()
                } else if (res.status === 401) {
                    dispatch(tokenRefresher(fetchUpdateProfile, self))
                }
            })
            .then(json => {
                console.log(json);
            })
            .catch(error => console.log(error))
    }
}

export function fetchOrganizations(self) {
    return (dispatch, getState) => {
        let access_token = getState().access_token;
        return fetch(self.url, {
            method: "GET", 
            headers: {"Authorization": "Bearer " + access_token}
        })
            .then((res) => {
                if (res.status === 202) {
                    return res.json()
                } else if (res.status === 401) {
                    dispatch(tokenRefresher(fetchOrganizations, self))
                }
            })
            .then(json => {
                self.setState({
                    organization: json["organization"],
                    isLoad: false
                })
            })
            .catch(error => console.log(error));
    }
}

export function fetchOrganization(self) {
    return (dispatch, getState) => {
        let access_token = getState().access_token;
        let url = organization_api() + "?_id=" + getState().id_org;
        return fetch(url, {
            method: "GET", 
            headers: {"Authorization": "Bearer " + access_token}
        })
            .then((res) => {
                if (res.status === 202) {
                    return res.json()
                } else if (res.status === 401) {
                    dispatch(tokenRefresher(fetchOrganization, self))
                }
            })
            .then(json => {
                self.setState({
                    org_name: json["organization"]["name"],
                    org_desc: json["organization"]["desc"],
                    org_load: false,
                })
            })
            .catch(error => console.log(error));
    }
}

export function fetchOtherOrganizations(self) {
    return (dispatch, getState) => {
        let access_token = getState().access_token;
        return fetch(self.url, {
            method: "GET", 
            headers: {"Authorization": "Bearer " + access_token}
        })
            .then((res) => {
                if (res.status === 202) {
                    return res.json()
                } else if (res.status === 401) {
                    dispatch(tokenRefresher(fetchOtherOrganizations, self))
                }
            })
            .then(json => {
                self.setState({
                    organization: json["organization"],
                    isLoad: false
                })
            })
            .catch(error => console.log(error));
    }
}

export function fetchDelOrganizations(self) {
    return (dispatch, getState) => {
        let access_token = getState().access_token;
        return fetch(self.url, {
            method: "DELETE", 
            headers: {
                "Authorization": "Bearer " + access_token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(self.body),
        })
            .then((res) => {
                if (res.status === 202) {
                    self.closeDeleteDialog();
                    window.location.reload();
                } else if (res.status === 401) {
                    dispatch(tokenRefresher(fetchDelOrganizations, self))
                }
            })
            .catch(error => console.log(error));
    }
}

export function fetchInventories(self) {
    return (dispatch, getState) => {
        let access_token = getState().access_token;
        let url = self.url + "?_id=" + self.id_org;
        return fetch(url, {
            method: "GET",
            headers: {"Authorization": "Bearer " + access_token}
        })
            .then((res) => {
                if (res.status === 202) {
                    return res.json()
                } else if (res.status === 401) {
                    dispatch(tokenRefresher(fetchInventories, self));
                }
            })
            .then(json => {
                self.setState({
                    isLoad: false,
                    inventory: json["inventory"]
                })
            })
            .catch(error => console.log(error));
    }
}

export function fetchDelInventory(self) {
    return (dispatch, getState) => {
        let access_token = getState().access_token;
        let url = self.url + "?_id=" + self.id_org;
        return fetch(url, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + access_token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(self.body)
        })
            .then((res) => {
                if (res.status === 202) {
                    self.closeDeleteDialog();
                    window.location.reload();
                } else if (res.status === 401) {
                    dispatch(tokenRefresher(fetchDelInventory, self));
                }
            })
            .catch(error => console.log(error));
    }
}

export function fetchMemberOrganization(self) {
    return (dispatch, getState) => {
        let access_token = getState().access_token;
        let id_org = getState().id_org;
        let url = members_api() + "?_id=" + id_org;
        return fetch(url, {
            method: "GET",
            headers: {"Authorization": "Bearer " + access_token}
        })
            .then((res) => {
                if (res.status === 202) {
                    return res.json()
                } else if (res.status === 401) {
                    dispatch(tokenRefresher(fetchMemberOrganization, self))
                }
            })
            .then(json => {
                self.setState({
                    isLoadMember: false,
                    admin: json["admin"],
                    members: json["members"],
                })
            })
            .catch(error => console.log(error));
    }
}

export function fetchAddMemberOrganization(self) {
    return (dispatch, getState) => {
        let access_token = getState().access_token;
        let url = self.url;
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + access_token,
            },
            body: JSON.stringify(self.body),
        })
            .then((res) => {
                if (res.status === 202) {
                    self.handleClose();
                    window.location.reload();
                } else if (res.status === 401) {
                    dispatch(tokenRefresher(fetchAddMemberOrganization, self))
                }
            })
            .catch(error => console.log(error));
    }
}

export function fetchUpdateMemberOrganization(body) {
    return (dispatch, getState) => {
        let access_token = getState().access_token;
        let url = members_api();
        return fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + access_token,
            },
            body: JSON.stringify(body),
        })
            .then((res) => {
                if (res.status === 202) {
                    window.location.reload();
                } else if (res.status === 401) {
                    dispatch(tokenRefresher(fetchAddMemberOrganization, body))
                }
            })
            .catch(error => console.log(error));
    }
}

export function fetchDelMemberOrganization(self) {
    return (dispatch, getState) => {
        let access_token = getState().access_token;
        let url = self.url;
        return fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + access_token,
            },
            body: JSON.stringify(self.body),
        })
            .then((res) => {
                if (res.status === 202) {
                    self.closeDeleteDialog();
                    window.location.reload();
                } else if (res.status === 401) {
                    dispatch(tokenRefresher(fetchDelMemberOrganization, self))
                }
            })
            .catch(error => console.log(error));
    }
}

export function fetchTasks(self) {
    return (dispatch, getState) => {
        let access_token = getState().access_token;
        let url = self.url + "?id_org=" + self.id_org + "&id_inv=" + self.id_inv;
        return fetch(url, {
            method: "GET",
            headers: {"Authorization": "Bearer " + access_token}
        })
            .then((res) => {
                if (res.status === 202) {
                    return res.json()
                } else if (res.status === 401) {
                    dispatch(tokenRefresher(fetchTasks, self))
                }
            })
            .then(json => {
                self.setState({
                    data: json["tasks"]
                })
            })
            .catch(error => console.log(error));
    }
}

export function fetchAddTask(self) {
    return (dispatch, getState) => { 
        let access_token = getState().access_token;
        let url = self.url;
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + access_token,
            },
            body: JSON.stringify(self.body),
        })
            .then((res) => {
                if (res.status === 202) {
                    self.handleClose();
                    window.location.reload();
                } else if (res.status === 401) {
                    dispatch(tokenRefresher(fetchAddTask, self));
                }
            })
            .catch(error => console.log(error));
    }
}

export function fetchDelTask(self) {
    return (dispatch, getState) => { 
        let access_token = getState().access_token;
        let url = self.url;
        return fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + access_token,
            },
            body: JSON.stringify(self.body),
        })
            .then((res) => {
                if (res.status === 202) {
                    self.closeDeleteDialog();
                    window.location.reload();
                } else if (res.status === 401) {
                    dispatch(tokenRefresher(fetchDelTask, self));
                }
            })
            .catch(error => console.log(error));
    }
}

export function tokenRefresher(func, args = null) {
    return (dispatch, getState) => {
        let refresh_token = getState().refresh_token;
        dispatch(tokenRefresherBegin());
        return fetch(refresh_api(), {
            method: 'POST',
            headers: {"Authorization": "Bearer " + refresh_token}
        })
            .then(res => res.json())
            .then(json => {
                dispatch(tokenRefresherSuccess(json["access_token"]));
                dispatch(func(args));
            })
            .catch(error => dispatch(tokenRefresherFailed(error)))
    }
}