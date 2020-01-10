// author: Bayu Aditya

var api = "http://0.0.0.0:8888/api";
// var api = "http://35.240.223.151/api";

get_list();

function get_list() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            const response = JSON.parse(this.responseText);
            response_to_table(response);
        }
    }
    var url = api + "/organization";
    xhr.open("GET", url, true);
    xhr.send();
}

function response_to_table(response) {
    var list = response.organizations,
        tab_body = document.getElementById("table_body");
    for (var i=0; i<list.length; i++) {
        var tr = document.createElement("tr"),
            td_user = document.createElement("td"),
            td_name = document.createElement("td"),
            td_btn = document.createElement("td"),
            btn_group = document.createElement("div"),
            btn_edit = document.createElement("button"),
            btn_delete = document.createElement("button");
        td_user.innerHTML = list[i].user;
        td_name.innerHTML = list[i].name;

        btn_group.className = "btn-group";
        btn_edit.className = "btn btn-info"; btn_edit.innerHTML = "edit"; btn_edit.id = "edit_" + list[i].name; 
        btn_edit.addEventListener("click", edit_row);
        btn_delete.className = "btn btn-danger"; btn_delete.innerHTML = "delete"; btn_delete.id = "delete_" + list[i].name;
        btn_delete.addEventListener("click", delete_row);
        
        btn_group.appendChild(btn_edit); btn_group.appendChild(btn_delete);
        tr.appendChild(td_user);
        tr.appendChild(td_name);
        tr.appendChild(btn_group);
        tab_body.appendChild(tr);
    }
}

function edit_row() {
    var data = button_user(this);
    console.log("Edit button id=", this.id, ";user=", data.user, ";name=", data.name);
}

function delete_row() {
    var data = button_user(this);
    console.log("Delete button id=", this.id, ";user=", data.user, ";name=", data.name);
    var url = api + "/" + data.user;
    console.log(url);
    var data_send = {"name": data.name}

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4){
            let response = JSON.parse(this.responseText);
            console.log(response);
            empty_list();
            get_list();
        }
    }
    xhr.open("DELETE", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data_send));
}

function button_user(btn) {
    var user = btn.parentElement.parentElement.children[0].innerHTML;
    var name = btn.parentElement.parentElement.children[1].innerHTML;
    return {"user": user, "name": name};
}

function empty_list() {
    var table_body = document.getElementById("table_body");
    table_body.innerHTML = "";
}