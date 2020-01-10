// author: Bayu Aditya

var api = "http://0.0.0.0:8888/api";
// var api = "http://35.240.223.151/api";
var MODAL = document.getElementById("modal-body");

function check_required(form) {
    let required = new Array();
    let a = 0;
    for (let i=0; i<form.childNodes.length; i++) {
        let parent = form.childNodes[i];
        if (parent.hasChildNodes()) {
            for (let j=0; j<parent.childNodes.length; j++) {
                let children = parent.childNodes[j];
                if (children.required == true && children.value == ""){
                    alert(children.name + " cannot be blank.");
                    return false;
                }
            }
        }
    }
    return true;
}

function process() {
    var USER = document.getElementById("user_inp").value;
    var NAME = document.getElementById("name_inp").value;
    var DESC = document.getElementById("desc_inp").value;
    var url = api + "/" + USER;
    var data = {
        "name": NAME, 
        "description": DESC};
    console.log(data, url);

    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        data_response = JSON.parse(this.responseText);
        console.log(data_response);
        MODAL.innerHTML = data_response.message;
    }
    req.open("POST", url);
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(data));
    console.log(req.responseText);

    $("#myModal").modal("show");
}

function submit() {
    var form = document.getElementById("form_id");
    if (check_required(form)) {
        console.log("process");
        process();
    }
    else {
        console.log("not process");
    }
}