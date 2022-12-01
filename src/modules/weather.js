import { PROXY } from "./proxy.js";
// import { COLORS } from "./color.js";
import { renderErrorMessage } from "./message.js";

/**
 * Fetch the weather using the Dark Sky API.
 * @param {string} apiKey The Dark Sky API key.
 * @param {number} latitude The latitude of the location.
 * @param {number} longitude The longitude of the location.
 * @returns {object} Data return by the API (JSON object).
 */
const fetchWeather = async (apiKey, latitude, longitude) => {
  let darkSkyApiLink = `${PROXY}https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}?exclude=minutely,alerts,flags`;
  try {
    const response = await fetch(darkSkyApiLink);
    return response.json();
  } catch (e) {
    renderErrorMessage(e);
  }
};

/**
 * Power the icon (using skycons library) of the current weather.
 * @param {string} icon The name/type of the icon to add.
 */
/*const powerIcon = (icon) => {
    let skycons = new Skycons({ "color": COLORS.icon[icon] }),
        skyconsType = (icon.replace(/-/g, '_')).toUpperCase();

    skycons.set("weatherIcon", skyconsType);
    skycons.play();
}*/

export { fetchWeather };
