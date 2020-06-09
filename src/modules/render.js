import icons from '../assets/images/icons/*.jpg'
import * as time from './time.js'
import * as utils from './utils.js'
import { initTempChart } from './chart.js'

/**
 * Private constants.
 */
const CX = document.getElementById('temp-chart'),
    METERS = document.querySelectorAll('svg[data-value] .meter');

/**
 * Render current weather into the DOM.
 * @param {object} currentData Data (current weather) return by the API.
 */
const renderCurrentlyWeather = (currentData) => {
    let temperature = utils.fToC(currentData.temperature),
        icon = currentData.icon,
        uvIndex = currentData.uvIndex,
        windSpeed = utils.mphTokmh(currentData.windSpeed),
        windGust = utils.mphTokmh(currentData.windGust),
        windBearing = utils.degToCard(currentData.windBearing),
        percentages = [],
        precipProbability = utils.decimalToPercentage(currentData.precipProbability),
        cloudPercentage = utils.decimalToPercentage(currentData.cloudCover),
        humidity = utils.decimalToPercentage(currentData.humidity);

    /** Icon */
    document.getElementById('main-icon').setAttribute('src', icons[icon]);
    document.getElementById('main-icon').setAttribute('alt', `${icon} icon`);

    /** Temperature */
    document.getElementById("currentTemp").innerHTML = `${Math.round(temperature)}&degC`;

    /** UV index */
    renderUvIndex(uvIndex);

    /** Wind */
    document.getElementById("windSpeed").innerHTML = `${Math.round(windSpeed)} km/h`;
    document.getElementById("windGust").innerHTML = `${Math.round(windGust)} km/h`;
    document.getElementById("windBearing").innerHTML = windBearing;

    /** Percentages */
    percentages.push(precipProbability, cloudPercentage, humidity);
    renderCircularCharts(METERS, percentages);
}

/**
 * Render daily weather into the DOM.
 * @param {object} dailyData Data (daily weather) return by the API.
 */
const renderDailyWeather = (dailyData) => {
    let summary = dailyData.summary;
    document.getElementById("summary").innerHTML = summary;
}

/**
 * Render UV index badges into the DOM.
 * @param {object} dailyData Current UV index.
 */
const renderUvIndex = (uvIndex) => {
    let content = document.getElementById('uvIndexBadges'), badges = [], values = ['1-2', '3-5', '6-7', '8-10', '11+'], container;

    if(content.firstChild != null){
        content.firstChild.remove();
    }

    container = document.createElement('div');
    container.classList.add('row');
    for(let i=0; i < 5; i++){
        let badge = document.createElement('span');
        badge.innerHTML = values[i];
        badges.push(badge);
    }
    badges.forEach((badge, index) => {
        badge.classList.add('badge', 'badge-secondary');
        if(uvIndex <= 2 && index == 0) badge.classList.replace('badge-secondary', 'badge-success');
        else if (uvIndex >= 3 && uvIndex <= 5 && index == 1) badge.classList.replace('badge-secondary', 'badge-caution');
        else if (uvIndex >= 6 && uvIndex <= 7 && index == 2) badge.classList.replace('badge-secondary', 'badge-warning');
        else if (uvIndex >= 8 && uvIndex <= 10 && index == 3) badge.classList.replace('badge-secondary', 'badge-danger');
        else if (uvIndex >= 11 && index == 4) badge.classList.replace('badge-secondary', 'badge-alarming');
    });
    for(let i=0; i < 5; i++){
        let badgeContainer = document.createElement('div');
        badgeContainer.classList.add('col-auto');
        badgeContainer.appendChild(badges[i]);
        container.appendChild(badgeContainer);
    }
    //console.log(container, content);
    content.appendChild(container);
}

/**
 * Use the data in parameters to render circular charts.
 * @param {object} METERS Collection of SVG paths.
 * @param {object} values Array containing percentages.
 */
const renderCircularCharts = (METERS, values) => {
    let desc;
    METERS.forEach((path, index) => {
        path.parentNode.setAttribute('data-value', values[index]);
        let parent = path.parentNode.parentNode,
            length = path.getTotalLength(),
            value = parseInt(path.parentNode.getAttribute('data-value')),
            to = length * ((100 - value) / 100);
        path.style.strokeDashoffset = Math.max(0, to);
        desc = document.createElement("p");
        desc.classList.add('mb-4', 'text-muted', 'text-sm');
        desc.innerHTML = values[index];

        parent.removeChild(parent.lastChild);
        parent.appendChild(desc);
    });
}

/**
 * Render data that have to be sent to the chart (as parameters).
 * @param {object} dailyData Data (forecast of the day) return by the API.
 */
const renderTempChart = (dailyData) => {
    let timeTab = [], tempTab = [], rowcount = dailyData.data.length;

    if (rowcount > 7) {
        rowcount = 7;
    }

    for (let i = 0; i < rowcount; i++) {
        let timestamp = time.formatTimestamp(dailyData.data[i].time),
            timeValue = time.getDayTime(timestamp),
            tempHigh = `${Math.round(utils.fToC(dailyData.data[i].temperature))}`;

        timeTab.push(timeValue);
        tempTab.push(tempHigh);
    }
    initTempChart(CX, timeTab, tempTab);
}

/**
 * Use the data in parameters to render forecasts of the next days into the DOM.
 * @param {object} meters Data (forecasts of the next days) return by the API.
 */
const renderWeeklyForecast = (weeklyForecastData) => {
    let rowcount = weeklyForecastData.data.length;

    if (rowcount > 4) {
        rowcount = 4;
    }

    for (let i = 0; i < rowcount; i++) {
        let timestamp = time.formatTimestamp(weeklyForecastData.data[i].time),
            day = time.getDay(timestamp),
            icon = weeklyForecastData.data[i].icon,
            tempHigh = `${Math.round(utils.fToC(weeklyForecastData.data[i].temperatureHigh))}&degC`,
            tempLow = `${Math.round(utils.fToC(weeklyForecastData.data[i].temperatureLow))}&degC`;

        document.getElementById('day' + (i + 1)).innerHTML = day;
        document.getElementById('icon' + (i + 1)).setAttribute('src', icons[icon]);
        document.getElementById('icon' + (i + 1)).setAttribute('alt', `${weeklyForecastData.data[i].icon} icon`);
        document.getElementById('tempHigh' + (i + 1)).innerHTML = `<span class="mr-1"><i class="fas fa-angle-up"></i></span>${tempHigh}`;
        document.getElementById('tempLow' + (i + 1)).innerHTML = `<span class="mr-1"><i class="fas fa-angle-down"></i></span>${tempLow}`;
    }
}

export { renderCurrentlyWeather, renderDailyWeather, renderCircularCharts, renderTempChart, renderWeeklyForecast, initTempChart }