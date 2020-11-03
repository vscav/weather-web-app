# Weather web application

> Don't get caught out in the rain. Get up to date forecasts with a cool weather app.

## How to install
1. Open your editor and the project folder in the terminal
2. Install all the dependencies by running `yarn`
3. Develop with `yarn dev`

## API keys

The application is powered by APIs, so you will need to create `src/modules/key.js` and fill it with :

```javascript
const KEYS = {
  DARKSKY_KEY: 'Your DarkSky API key here',
  GOOGLE_KEY: 'Your Google API key here',
};

export { KEYS };
```
For your Google app project, you will need to enable Maps, Places and Geocoding.

## Congrats!

![Congrats dude!](https://media.giphy.com/media/YRuFixSNWFVcXaxpmX/giphy.gif)
