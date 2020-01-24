import { create_access_token, get_access_token, get_refresh_token } from './cookie';

function auth_check() {
    if (get_access_token()) {
        return true
    } else {
        return false
    }
}

function refresh_token() {
    let refresh = get_refresh_token();
    fetch("http://0.0.0.0:8888/refresh", {
        method: 'POST',
        headers: {"Authorization": 'Bearer '+refresh}
    })
    .then((response) => response.json())
    .then((data) => create_access_token(data))
    console.log("refreshing token");
}

export {auth_check};
export {refresh_token};