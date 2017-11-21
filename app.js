const request = require('request');
const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const forecast = require('./Forecast/forecast');
var fahrenheitToCelsius = require('fahrenheit-to-celsius');

var argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'need address to get weather',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodeAddress = encodeURIComponent(argv.address);

geocode.requestGeocode(encodeAddress, (errorMessage, result) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(result.address);
        forecast.getForecast(result.lat, result.long, (errorMessage, result) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`it is currently ${fahrenheitToCelsius(result.currently.temperature).toFixed(2)} and it feels like ${fahrenheitToCelsius(result.currently.apparentTemperature).toFixed(2)}`);
            }
        })

    }
});

//1f10d900075c8cbaf62eb38ebaf6362b