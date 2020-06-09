import { fetchWeather } from './weather.js'
import { renderErrorMessage, renderWarningMessage } from './message.js'
import * as loader from './loader.js'
import * as display from './display.js'

const currentLocation = {
    name: '', lat: 0, lng: 0
};

const quickLocations = [
    ['New-York', 40.7127753, -74.0059728],
    ['Los Angeles', 34.0522342, -118.2436849],
    ['Champs-sur-Marne', 48.8415232, 2.5837567999999997],
    ['Moskva', 55.755826, 37.617299900000035],
    ['London', 51.5073509, -0.12775829999998223],
    ['Melbourne', -37.8136276, 144.9630576]
];

const userLocations = [];

/**
 * Private function.
 * Initialize the Google Map API search-bar.
 */
const initGoogleMapAPI = (googleApiKey, darkSkyApiKey) => {
    let googleSearchInput = document.querySelector("#city-search"),
        autocomplete = new google.maps.places.SearchBox(googleSearchInput);

    autocomplete.addListener('places_changed', async () => {
        loader.addLoader();

        googleSearchInput.value = '';

        let lat = autocomplete.getPlaces()[0].geometry.location.lat(),
            lng = autocomplete.getPlaces()[0].geometry.location.lng();

        const location = await fetchLocation(googleApiKey, lat, lng),
            weather = await fetchWeather(darkSkyApiKey, lat, lng);

        loader.removeLoader();

        display.displayLocation(location);
        display.displayWeather(weather);
    });
}

/**
 * Insert the Google Map API script into the DOM.
 * @param {string} apiKey The Google Map API key.
 */
const insertGoogleMapAPIScript = (googleApiKey, darkSkyApiKey) => {
    let google_map_api = document.createElement('script');
    google_map_api.async = true;
    google_map_api.defer = true;
    google_map_api.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places,geometry`;
    /** Impossible to call initGoogleMapAPI as a callback function directly in the script url, so when the script is loaded, initGoogleMapAPI function is called */
    google_map_api.onload = () => initGoogleMapAPI(googleApiKey, darkSkyApiKey);
    document.body.appendChild(google_map_api);
}

/**
 * Fetch the location using the Google Geolocation API.
 * @param {string} apiKey The Google Map API key.
 * @param {number} latitude The latitude of the location.
 * @param {number} longitude The longitude of the location.
 * @returns {object} Data return by the API (JSON object).
 */
const fetchLocation = async (apiKey, latitude, longitude) => {
    let googleApiLink = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
    try {
        const response = await fetch(googleApiLink);
        return response.json();
    } catch (e) {
        renderErrorMessage(e);
    }
}

/**
 * Add current location to user's favorites.
 */
const addToUserLocation = (currentLocation) => {
    let addButton, add = 1;
    userLocations.forEach((city) => {
        if(currentLocation.name === city[0]) {
            add = 0;
        }
    });
    if(add == 1) {
        let newCity = [currentLocation.name, currentLocation.lat, currentLocation.lng];
        userLocations.push(newCity);
        display.displayUserLocations(userLocations);
    } else {
        renderWarningMessage();
    }
}

export { currentLocation, userLocations, quickLocations, addToUserLocation, insertGoogleMapAPIScript, fetchLocation }