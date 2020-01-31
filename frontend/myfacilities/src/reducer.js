import { get_access_token, get_refresh_token } from './action/cookie';

const initialState = {
    auth: false,
    access_token: null,
    refresh_token: null,
    name: null,
    id_org: null,
    id_inv: null,
    error: null,
}

function reducers(state = initialState, action) {
    console.log("reducers: ", state, action);
    switch (action.type) {
        case "GET_ACCESS_TOKEN":
            return {
                ...state, 
                access_token: get_access_token()
            };
        case "GET_REFRESH_TOKEN":
            return {
                ...state, 
                refresh_token: get_refresh_token()
            }
        case "LOGIN":
            return {
                ...state, 
                auth: true,
                access_token: get_access_token(),
                refresh_token: get_refresh_token(),
            }
        case "LOGOUT":
            return {...initialState}
        case "SET_NAME":
            return {...state, name: action.name}
        case "FETCH_NAME_BEGIN":
            return {...state, error: null}
        case "FETCH_NAME_SUCCESS":
            return {...state, name: action.name}
        case "FETCH_NAME_FAILED":
            return {...state, error: action.error}
        case "TOKEN_REFRESHER_BEGIN":
            return {...state, error: null}
        case "TOKEN_REFRESHER_SUCCESS":
            return {...state, access_token: action.access_token}
        case "TOKEN_REFRESHER_FAILED":
            return {...state, error: action.error}
        case "SELECT_ORGANIZATION":
            return {...state, id_org: action.id_org}
        case "SELECT_INVENTORY":
            return {...state, id_inv: action.id_inv}
        default:
            return state
    }
}

export {reducers};