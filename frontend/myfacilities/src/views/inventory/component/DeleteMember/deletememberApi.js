import { members_api } from '../../../../api/link';
import { tokenRefresher } from '../../../../action';

export function fetchDelMemberOrganization(self) {
    return (dispatch, getState) => {
        let access_token = getState().access_token;
        let url = members_api();
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