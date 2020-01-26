import { 
    create_access_token, 
    get_access_token, 
    get_refresh_token } from './cookie';
import { refresh_api } from '../api/link.js';

function auth_check() {
    if (get_access_token() && get_refresh_token()) {
        return true
    } else {
        return false
    }
}

function refresh_token(self) {
    const request = async() => {
        let refresh = get_refresh_token();
        const response = await fetch(refresh_api(), {
            method: 'POST',
            headers: {"Authorization": 'Bearer '+refresh}
        });
        console.log(response.status);
        const json = await response.json();
        create_access_token(json);
        return json["access_token"]
    }
    let a = request();
    setTimeout(() => {self.setState({access_token: get_access_token()})}, 1000)
    console.log(a);
    console.log("refreshing token");
}

export {auth_check};
export {refresh_token};