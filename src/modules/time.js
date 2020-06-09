const DAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/**
 * Format the time and create a new date.
 * @param {number} time Time in millisecondes.
 * @returns {object} Returns a date object.
 */
const formatTimestamp = (timestamp) => {
    return new Date(timestamp * 1000);
}

/**
 * Private function.
 * Get the clock period (AM or PM).
 * @param {number} hours
 * @returns {string}
 */
const getClockPeriod = (hours) => {
    return (hours >= 12) ? " PM" : " AM";
}

/**
 * Get the day of the week.
 * @param {object} timestamp
 * @returns {string}
 */
const getDay = (timestamp) => {
    return DAY[timestamp.getDay()];
}

/**
 * Get the time (without minutes).
 * @param {object} timestamp
 * @returns {string}
 */
const getDayTime = (timestamp) => {
    let hours = timestamp.getHours();
    let timeValue;
    if (hours > 0 && hours <= 12) {
        timeValue = "" + hours;
    } else if (hours > 12) {
        timeValue = "" + (hours - 12);
    } else if (hours == 0) {
        timeValue = "12";
    }
    timeValue += getClockPeriod(hours);
    return timeValue;
}

/**
 * Get the time (with minutes).
 * @param {object} timestamp
 * @returns {string}
 */
const getPreciseDayTime = (timestamp) => {
    let hours = timestamp.getHours();
    let minutes = timestamp.getMinutes();
    let timeValue;
    if (hours > 0 && hours <= 12) {
        timeValue = hours + ":";
    } else if (hours > 12) {
        timeValue = (hours - 12) + ":";
    } else if (hours == 0) {
        timeValue = "12:";
    }
    if (minutes < 10) {
        timeValue += "0" + minutes;
    } else {
        timeValue += minutes;
    }
    timeValue += getClockPeriod(hours);
    return timeValue;
}

export { DAY, MONTH, formatTimestamp, getDay, getDayTime, getPreciseDayTime }