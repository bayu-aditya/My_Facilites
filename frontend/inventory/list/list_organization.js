// author: Bayu Aditya

var api = "http://0.0.0.0:8888/api";
// var api = "http://35.240.223.151/api";
var url = api + "/organization";

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
        const response = JSON.parse(this.responseText);
        response_to_table(response);
    }
}
xhr.open("GET", url, true);
xhr.send();

function response_to_table(response) {
    var list = response.organizations,
        tab_body = document.getElementById("table_body");
    for (var i=0; i<list.length; i++) {
        var tr = document.createElement("tr"),
            td_user = document.createElement("td"),
            td_name = document.createElement("td");
        td_user.innerHTML = list[i].user;
        td_name.innerHTML = list[i].name;
        tr.appendChild(td_user);
        tr.appendChild(td_name);
        tab_body.appendChild(tr);
    }
}