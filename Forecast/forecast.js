const request = require('request');

var getForecast = (lat,long,callback) => {
    request({
        url: `https://api.darksky.net/forecast/1f10d900075c8cbaf62eb38ebaf6362b/${lat},${long}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback("connection Error")
        } else if (body.code === 400) {
            callback("Forecast Error")
        } else if (response.statusCode === 200) {
            callback(undefined,body);
        }
    });
};

module.exports = {
    getForecast
};