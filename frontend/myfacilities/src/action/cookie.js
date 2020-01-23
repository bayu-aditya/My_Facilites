// ========================= USER account =============================
function create_access_token(responseJSON) {
    document.cookie = 'access_token='+responseJSON["access_token"]+"; path=/";
}

function get_access_token() {
    var x = document.cookie.split(";");
    var result = null
    x.map((data) => {
        var key = data.split("=")[0];
        var value = data.split("=")[1];
        
        if (key[0] === " ") {
            key = key.substring(1);
        }
        if (key === "access_token") {
            console.log("found access token")
            result = value
        }
    })
    return result
}

function delete_access_token() {
    document.cookie = "access_token=; path=/";
}
// ===================================================================

function create_cookie(key, value) {
    document.cookie = key+"="+value+"; path=/";
}
function get_cookie(key_pair) {
    var x = document.cookie.split(";");
    var result = null
    x.map((data) => {
        var key = data.split("=")[0];
        var value = data.split("=")[1];
        
        if (key[0] === " ") {
            key = key.substring(1);
        }
        if (key === key_pair) {
            result = value
        }
    })
    return result
}

export {create_access_token};
export {get_access_token};
export {delete_access_token};

export {create_cookie};
export {get_cookie};