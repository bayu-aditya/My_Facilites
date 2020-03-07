function getInitialWeekMonday(date) {
    let today = date;
    if (today.getDay() === 0) {
        return resetClockToZero(
            new Date(today.setDate(today.getDate() - 7 + 1))    // Case when today is sunday
            );  
    } else {
        return resetClockToZero( 
            new Date(today.setDate(today.getDate() - today.getDay() + 1))
            );
    }
}

function getLastWeekMonday(date) {
    let today = date;
    if (today.getDay() === 0) {
        return resetClockToZero(
            new Date(today.setDate(today.getDate() + 1))        // Case when today is sunday
            ); 
    } else {
        return resetClockToZero(
            new Date(today.setDate(today.getDate() - today.getDay() + 8))
            );
    }
}

function resetClockToZero(date) {
    return new Date(date.setHours(0));
}

function getNameFromUsername(username, admin_list, member_list) {
    // admin list
    for (let i=0; i<admin_list.length; i++) {
        if (username === admin_list[i]["username"]) {
            return admin_list[i]["name"];
        }
    }
    // member list
    for (let i=0; i<member_list.length; i++) {
        if (username === member_list[i]["username"]) {
            return member_list[i]["name"];
        }
    }
}

export { getInitialWeekMonday };
export { getLastWeekMonday };
export { getNameFromUsername };