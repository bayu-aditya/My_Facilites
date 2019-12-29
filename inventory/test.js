const url = "http://35.240.223.151:8888/api/items";

const ul = document.getElementById('inventory');
fetch(url)
.then((resp) => resp.json())
.then(function(data) {
    let inven_item = data.items;
    return inven_item.map(function(inven_item) {
        let li = document.createElement('li'),
            ul_1 = document.createElement('ul'),
            li_start = document.createElement('li');
            li_end = document.createElement('li')

        li.innerHTML = `${inven_item.name}`;
        li_start.innerHTML = `${inven_item.start}`;
        li_end.innerHTML = `${inven_item.end}`;

        ul_1.appendChild(li_start);
        ul_1.appendChild(li_end);
        li.appendChild(ul_1);
        ul.appendChild(li);
    })
})

const table = document.getElementById('tab');
fetch(url)
.then((resp) => resp.json())
.then(function(data) {
    let inven_item = data.items;
    return inven_item.map(function(inven_item) {
        let tr = document.createElement('tr'),
            td_name = document.createElement('td'),
            td_start = document.createElement('td'),
            td_end = document.createElement('td');
        
        td_name.innerHTML = `${inven_item.name}`;
        td_start.innerHTML = `${inven_item.start}`;
        td_end.innerHTML = `${inven_item.end}`;

        tr.appendChild(td_name);
        tr.appendChild(td_start);
        tr.appendChild(td_end);
        table.appendChild(tr);
    })
})

// console.log(resp)