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

export { getInitialWeekMonday };
export { getLastWeekMonday };