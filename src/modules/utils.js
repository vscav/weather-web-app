/**
 * Convert Fahrenheit degrees to Celsius degrees.
 * @param {number} fahrenheit The temperature in fahrenheit degrees.
 * @returns {number} The temperature in celcius degrees.
 */
const fToC = (fahrenheit) => {
  let fTemp = fahrenheit,
    cTemp = ((fTemp - 32) * 5) / 9;

  return cTemp;
};

/**
 * Convert mph speed to Km/h speed.
 * @param {number} mph The mph speed.
 * @returns {number} The Km/h speed.
 */
const mphTokmh = (mph) => {
  let mphSpeed = mph,
    kmhSpeed = mphSpeed * 1.609344;

  return kmhSpeed;
};

/**
 * Convert wind degree direction in wind cardinal direction.
 * @param {number} deg The wind direction in degrees.
 * @returns {string} The cardinal points.
 */
const degToCard = (deg) => {
  let val = Math.floor(deg / 22.5 + 0.5);
  let arr = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return arr[val % 16];
};

/**
 * Transform a decimal number into his percentage equivalent.
 * @param {number} decimal
 * @returns {number}
 */
const decimalToPercentage = (decimal) => {
  return Math.round(decimal * 100);
};

export { fToC, mphTokmh, degToCard, decimalToPercentage };
