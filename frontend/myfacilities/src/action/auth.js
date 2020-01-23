import { get_access_token } from './cookie';

function auth_check() {
    if (get_access_token()) {
        return true
    } else {
        return false
    }
}

export {auth_check};