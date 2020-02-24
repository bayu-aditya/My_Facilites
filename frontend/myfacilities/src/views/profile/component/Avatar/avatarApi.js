import { avatar_api } from '../../../../api/link';
import { 
    fetchProfile,
    tokenRefresher } from '../../../../action';

export function uploadAvatarAPI(props) {
    return (dispatch, getState) => {
        let access_token = getState().access_token;
        let { formData, closeDialog } = props;

        return fetch(avatar_api(), {
            method: "PUT",
            body: formData,
            headers: {"Authorization": "Bearer " + access_token}
        })
            .then((res) => {
                if (res.status === 202) {
                    return res.json();
                } else if (res.status === 401) {
                    dispatch(tokenRefresher(uploadAvatarAPI, props));
                }
            })
            .then(json => {
                console.log(json["message"])
                dispatch(fetchProfile())
                closeDialog();
            })
            .catch(error => console.log(error));
    };
};

export function removeAvatarAPI(props) {
    return (dispatch, getState) => {
        let access_token = getState().access_token;
        let { closeDialog } = props;

        return fetch(avatar_api(), {
            method: "DELETE",
            headers: {"Authorization": "Bearer " + access_token}
        })
            .then((res) => {
                if (res.status === 202) {
                    return res.json()
                } else if (res.status === 401) {
                    dispatch(tokenRefresher(removeAvatarAPI, props));
                }
            })
            .then(json => {
                dispatch(fetchProfile());
                closeDialog();
            })
    }
}