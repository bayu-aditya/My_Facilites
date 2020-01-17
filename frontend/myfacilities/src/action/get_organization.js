import $ from 'jquery';

// var admin = "bayu_aditya";
// var API = "http://0.0.0.0:8888/organizations";
// var url = API + "?admin=" + admin;

// var xhr = new XMLHttpRequest();
// xhr.onreadystatechange = function() {
//     if (this.readyState === 4 && this.status === 200) {
//         var resp = JSON.parse(this.responseText);
//         // console.log(resp);
//         show_organization();
//     }
// }
// xhr.open("GET", url, true);
// xhr.send();

// function show_organization() {
//     let body = document.getElementById("body_tb_org");
//     body.innerHTML = "test"
// }



// contoh respon dari API
var data = {
    "organization": [
        {
            "_id": "123456",
            "name": "Fakultas Ilmu Komputer"
        },
        {
            "_id": "789123",
            "name": "Computational and Experimental Nanoscience"
        }
    ]
}

// // export {get_list_organization};
// export {data};