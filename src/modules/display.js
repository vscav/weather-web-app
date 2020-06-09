import { KEYS } from './key.js'
import { renderCurrentlyWeather, renderDailyWeather, renderTempChart, renderWeeklyForecast } from './render.js'
import * as loader from './loader.js'
import { fetchWeather } from './weather.js'
import { currentLocation, fetchLocation } from './location.js';

/**
 * Display the location return by the API.
 * @param {object} data Data return by the API.
 */
const displayLocation = (data) => {
    let BreakException = {}, components = data.results[0].address_components, location, city, country;

    /** Important : city and country separation */
    try {
        components.forEach((component) => {
            if (component.types[0] == 'administrative_area_level_1') city = component.long_name;
            if (component.types[0] == 'postal_town') {
                city = component.long_name;
                throw BreakException;
            }
            if (component.types[0] == 'locality') {
                city = component.long_name;
                throw BreakException;
            }
        });
    } catch (e) {
        if (e !== BreakException) throw e;
    }

    components.forEach((component) => {
        if (component.types[0] == 'country') country = component.long_name;
    });

    location = city + ", " + country;
    /** Stock name of the current city */
    currentLocation['name'] = city;
    /** Display the location in the DOM */
    document.getElementById("location").innerHTML = location;
}

/**
 * Display the weather return by the API.
 * @param {object} data Data return by the API.
 */
const displayWeather = (data) => {
    /** Stock latitude and longitude of the current city */
    currentLocation.lat = data.latitude;
    currentLocation.lng = data.longitude;
    /** Render current weather */
    renderCurrentlyWeather(data.currently);
    /** Render daily weather */
    renderDailyWeather(data.daily);
    /** Render temperatures chart */
    renderTempChart(data.hourly);
    /** Render daily forecasts */
    renderWeeklyForecast(data.daily);
}

/**
 * Create top city searches links.
 * Display the weather from the top searches.
 * @param {object} data Array with top city searches and their locations.
 */
const displayQuickLocations = (locations) => {
    let container, divider, title, list;

    container = document.getElementById('search-components');

    divider = document.createElement('hr');
    divider.classList.add('my-3');

    title = document.createElement('h6');
    title.innerHTML = 'Popular search'
    title.classList.add('navbar-heading', 'text-muted');

    list = document.createElement('ul');
    list.classList.add('navbar-nav', 'mb-md-3');

    container.appendChild(divider);
    container.appendChild(title);
    container.appendChild(list);

    locations.forEach((city) => {
        let listElement = document.createElement('li');
        listElement.classList.add('nav-item');
        let link = document.createElement('a');
        link.classList.add('nav-link');

        link.innerHTML = `<i class="ni ni-bold-right"></i>${city[0]}`;
        listElement.appendChild(link);
        list.appendChild(listElement);

        link.addEventListener('click', async () => {
            loader.addLoader();

            const location = await fetchLocation(KEYS["GOOGLE_KEY"], city[1], city[2]),
                weather = await fetchWeather(KEYS["DARKSKY_KEY"], city[1], city[2]);

            loader.removeLoader();

            displayLocation(location);
            displayWeather(weather);
        });
    });
}

/**
 * Create top city searches links.
 * Display the weather from the top searches.
 * @param {object} data Array with top city searches and their locations.
 */
const displayUserLocations = (locations) => {
    let container, divider, title, list, titleText = 'Your cities';

    container = document.getElementById('search-components');

    if (container.getElementsByTagName('h6')[0].innerHTML == titleText) {
        container.removeChild(container.getElementsByTagName('hr')[0]);
        container.removeChild(container.getElementsByTagName('h6')[0]);
        container.removeChild(container.getElementsByTagName('ul')[0]);
    }

    divider = document.createElement('hr');
    divider.classList.add('my-3');

    title = document.createElement('h6');
    title.innerHTML = titleText;
    title.classList.add('navbar-heading', 'text-muted');

    list = document.createElement('ul');
    list.classList.add('navbar-nav', 'mb-md-3');

    container.prepend(list);
    container.prepend(title);
    container.prepend(divider);

    if (locations.length == 0) {
        let listElement = document.createElement('li');
        let message = document.createElement('p');
        listElement.classList.add('nav-item');
        message.classList.add('text-center', 'text-muted', 'text-small', 'mb-0');
        message.innerHTML = 'You have 0 city saved';
        listElement.appendChild(message);
        list.appendChild(listElement);
    } else {
        locations.forEach((city) => {
            let listElement = document.createElement('li');
            listElement.classList.add('nav-item');
            let link = document.createElement('a');
            link.classList.add('nav-link');

            link.innerHTML = `<i class="ni ni-bold-right"></i>${city[0]}`;
            listElement.appendChild(link);
            list.appendChild(listElement);

            link.addEventListener('click', async () => {
                loader.addLoader();

                const location = await fetchLocation(KEYS["GOOGLE_KEY"], city[1], city[2]),
                    weather = await fetchWeather(KEYS["DARKSKY_KEY"], city[1], city[2]);

                loader.removeLoader();

                displayLocation(location);
                displayWeather(weather);
            });
        });
    }
}

export { displayUserLocations, displayQuickLocations, displayLocation, displayWeather }