import '@babel/polyfill'

import { KEYS } from './modules/key.js'
import { renderErrorMessage } from './modules/message.js'
import * as loader from './modules/loader.js'
import { fetchWeather } from './modules/weather.js'
import { currentLocation, userLocations, quickLocations, insertGoogleMapAPIScript, fetchLocation, addToUserLocation } from './modules/location.js'
import * as display from './modules/display.js'

/**
 * Call two functions when the DOM is loaded.
 * @param {object} e DOMContentLoaded event.
 */
const initialize = (e) => {
    initGeolocation();
}

/**
 * Ask user for his current location.
 */
const initGeolocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, fail);
    } else {
        fail();
    }
}

/**
 * Fetch data from API if the current location is available.
 * @param {object} position
 */
const success = async (position) => {
    let addButton;
    insertGoogleMapAPIScript(KEYS["GOOGLE_KEY"], KEYS["DARKSKY_KEY"]);
    const location = await fetchLocation(KEYS["GOOGLE_KEY"], position.coords.latitude, position.coords.longitude),
        weather = await fetchWeather(KEYS["DARKSKY_KEY"], position.coords.latitude, position.coords.longitude);
    loader.removeLoader();
    display.displayLocation(location);
    display.displayWeather(weather);
    display.displayQuickLocations(quickLocations);
    display.displayUserLocations(userLocations);
    addButton = document.querySelector('#add-user-city')
    addButton.addEventListener('click', () => {
        addToUserLocation(currentLocation);
    })
}

/**
 * Render alert messages (screen and console) if the current location is unavailable.
 * @param {object} positionError Error message.
 */
const fail = (positionError) => {
    renderErrorMessage(positionError);
}

document.addEventListener("DOMContentLoaded", initialize);