const yargs = require('yargs');
const axios = require('axios');
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
var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`;

axios.get(geocodeURL).then((response) => {
    //console.log(response.data);
    if (response.data.status === "ZERO_RESULTS") {
        throw new Error("No results")
    } else if (response.data.status === "OK") {
        var lat = response.data.results[0].geometry.location.lat;
        var long = response.data.results[0].geometry.location.lng;
        var forecastURL = `https://api.darksky.net/forecast/1f10d900075c8cbaf62eb38ebaf6362b/${lat},${long}`;
        return axios.get(forecastURL).then((response) => {
            console.log(`it is currently ${fahrenheitToCelsius(response.data.currently.temperature).toFixed(2)} and it feels like ${fahrenheitToCelsius(response.data.currently.apparentTemperature).toFixed(2)}`);
        })

    }
}).catch((err)=>{
    if(err.config === "ENOTFOUND'") {
        console.log("Could not connect");
    }
    console.log(err)
});

//1f10d900075c8cbaf62eb38ebaf6362b