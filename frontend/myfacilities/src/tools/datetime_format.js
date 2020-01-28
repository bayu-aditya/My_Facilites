function get_datetime(date) {
    let tahun = date.getFullYear();
    let bulan = ("0" + (date.getMonth() + 1)).slice(-2);
    let tanggal = date.getDate();
    let jam = ("0" + date.getHours()).slice(-2);
    let menit = ("0" + date.getMinutes()).slice(-2);
    return tahun + '-' + bulan + '-' + tanggal + ' ' + jam + ':' + menit
}

export {get_datetime};